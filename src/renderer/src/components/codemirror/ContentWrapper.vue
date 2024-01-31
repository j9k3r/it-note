<script setup lang="ts">
import { computed, reactive, ref, shallowRef } from "vue";
import { useNotesStore } from "../../store/notes";
import { Codemirror } from 'vue-codemirror'

import { themes, themesList } from "./themes";
import { langs, langList } from "./langs";

import TextWrapp from "./TextWrapp.vue";


const props = defineProps({
  code: String,
  id: Number,
  type: String,
  theme: {
    type: String,
    default: themesList[0 as keyof typeof themesList]
  },
  lang: {
    type: String,
    default: langList[0 as keyof typeof langList]
  }
})

const notes = useNotesStore()

// Codemirror: notes.note[props.id].type,
const componentVariants= { //Todo убрать в Enum
  'codemirror': Codemirror,
  'textWrapp': TextWrapp
}
const themesListArray = () => {
  // const themesArray = Object.keys(themesList).filter(key => !isNaN(Number(themesList[key])));
  return Object.keys(themesList).filter(key => Number.isInteger(themesList[key]))
}

const langsListArray = () => {
  return Object.keys(langList).filter(key => Number.isInteger(langList[key]))
}

const code = ref(`console.log('Hello, world!')`)
// const code = ref(
//             'const code = `function myFunction() {\n' +
//                   '  console.log(\'Hello, World!\');\n' +
//                   '}`;'
// )

const extensions = ref([
  langs[0],
  themes[0]
])

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view

  if (props.theme) {
    let newTheme = themesList[props.theme]

    extensions.value = [
      extensions.value[0],
      themes[newTheme]
    ]
  }

  if (props.lang) {
    let newLang = langList[props.lang]

    extensions.value = [
      langs[newLang],
      extensions.value[1]
    ]
  }
}


// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  // more state info ...
  // return ...
}



function log(eventType, event) {
  // console.log('Event type:', eventType);
  // console.log('Event object:', event);


  //изменение состояния редактора
  // const state = view.value.state // Получить текущее состояние редактора
  // const updatedText = state.doc.toString() // Получить содержимое
  // console.log('EditorState object:', updatedText);

  // const languag =  state.facet(language)

  // console.log('Current language: ', languag)

}


function changeTheme(ev) {
  console.log('Ch theme ',  ev.target.value)

  const selectedTheme = themes[Number(ev.target.value)];

  extensions.value = [
    extensions.value[0],
    selectedTheme
  ]

  notes.updateTheme(themesList[Number(ev.target.value)], props.id)
}

function changeLang(ev) {
  console.log('Ch lang ', ev.target.value)

  const selectedLang = langs[Number(ev.target.value)];

  extensions.value = [
    selectedLang,
    extensions.value[1]
  ]

  notes.updateLang(langList[Number(ev.target.value)], props.id)
}

function changeDoc(ev, id) {
  notes.updateDoc(ev, id)
}

function addCode(type: string) {
  notes.addElement(props.id, type)
}

function removeCode() {
  notes.removeElement(props.id)
}

function elementUp() {
  notes.elementUp(props.id)
}
function elementDown() {
  notes.elementDown(props.id)
}

</script>

<template>

  <section>
    <header>
      <div v-if="props.type === 'codemirror'">
        <div>lang:
          <select @change="changeLang($event)">
            <option v-for="(item, index) in langsListArray()" :key="index" :value="index" :selected="item === extensions[0].name">{{ item }}</option>
          </select>
        </div>

        <div>style:
          <select @change="changeTheme($event)">
            <option v-for="(item, index) in themesListArray()" :key="index" :value="index" :selected="item === extensions[1].name">{{ item }}</option>
          </select>
        </div>
      </div>

      <div class="element-position">
        <button @click="elementUp()">Up</button>
        <button @click="elementDown()">Down</button>
      </div>
    </header>

<!--    :value="props.code"-->
<!--    v-model="code"-->

<!--    :is="comp[notes.note.content[props.id].type]"-->
    <component :is="componentVariants[props.type]"

          :modelValue="props.code"
          @update:modelValue="changeDoc($event, props.id)"
          placeholder="Code goes here..."
          :style="{ height: '400px' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="3"
          :extensions="extensions"
          @ready="handleReady"

          @change="log('change', $event)"
          @focus="log('focus', $event)"
          @blur="log('blur', $event)"
    ></component>
<!--    <codemirror-->
<!--      :modelValue="props.code"-->
<!--      @update:modelValue="changeDoc($event, props.id)"-->
<!--      placeholder="Code goes here..."-->
<!--      :style="{ height: '400px' }"-->
<!--      :autofocus="true"-->
<!--      :indent-with-tab="true"-->
<!--      :tab-size="3"-->
<!--      :extensions="extensions"-->
<!--      @ready="handleReady"-->

<!--      @change="log('change', $event)"-->
<!--      @focus="log('focus', $event)"-->
<!--      @blur="log('blur', $event)"-->
<!--    />-->

    <footer>
      <button @click="addCode('codemirror')">code +</button>
      <button @click="addCode('textWrapp')">text +</button>
      <button @click="removeCode">remove x</button>
    </footer>
  </section>

</template>

<style scoped>
.element-position {
  display: flex;
  justify-content: right;
  padding: 5px;
}
</style>

<script setup lang="ts">
import { computed, reactive, ref, shallowRef } from "vue";
import { useNotesStore } from "../../store/notes";
import { Codemirror } from 'vue-codemirror'
import { themes, themesList } from "./themes";

import { language } from '@codemirror/language'
import { javascript } from '@codemirror/lang-javascript'
import { htmlLanguage } from '@codemirror/lang-html';
import { langs, langList } from "./langs";


const props = defineProps({
  code: String,
  id: Number,
  theme: String,
  lang: String
})

const notes = useNotesStore()

// const curentLang = computed(() => {
//   return view.value.state.facet(language).name
// })

const themesListArray = () => {
  // const themesArray = Object.keys(themesList).filter(key => !isNaN(Number(themesList[key])));
  return Object.keys(themesList).filter(key => Number.isInteger(themesList[key]))
}

const code = ref(`console.log('Hello, world!')`)
// const code = ref(
//             'const code = `function myFunction() {\n' +
//                   '  console.log(\'Hello, World!\');\n' +
//                   '}`;'
// )

const extensions = ref([
  // javascript(),
  htmlLanguage,
  themes[0]
])

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view

  if (props.theme) {
    let newTheme = themesList[props.theme]
    // console.log(extensions.value[1])
    // console.log(newTheme)
    // extensions.value[1] = themes[newTheme]


    // extensions.value[1] = themes[newTheme]
    extensions.value = [
      // htmlLanguage,
      langs[langList[props.lang]],
      themes[newTheme]
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
    // htmlLanguage,
    extensions.value[0],
    selectedTheme
  ]

  notes.updateTheme(themesList[Number(ev.target.value)], props.id)
}

function changeLang(ev) {
  console.log('Ch theme ', ev.target.value)

  const selectedLang = langs[Number(ev.target.value)];

  extensions.value = [
    // htmlLanguage,
    selectedLang,
    extensions.value[1]
  ]

  notes.updateLang(langList[Number(ev.target.value)], props.id)
}

function changeDoc(ev, id) {
  notes.updateDoc(ev, id)
}

</script>

<template>

  <section>
    <div>
<!--      :selected="item.name === curentLang"-->
      <select @change="changeLang($event)">
        <option v-for="(item, index) in langs" :key="index" :value="index" :selected="item.name === extensions[0].name">{{ item.name }}</option>
      </select>
    </div>

    <div>
      <select @change="changeTheme($event)">
        <option v-for="(item, index) in themesListArray()" :key="index" :value="index" :selected="item === extensions[1].name">{{ item }}</option>
      </select>
    </div>


<!--    :value="props.code"-->
<!--    v-model="code"-->
    <codemirror
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
    />
  </section>

</template>

<style scoped>

</style>

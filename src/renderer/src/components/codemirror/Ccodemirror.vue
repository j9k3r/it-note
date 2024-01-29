<script setup lang="ts">
import {  ref, shallowRef } from "vue";
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'


import { language } from '@codemirror/language'

import { htmlLanguage } from '@codemirror/lang-html';



import themes from "./themes";


const code = ref(`console.log('Hello, world!')`)
const myTabSize = ref(3);

// const initialEditorState = EditorState.create({
//   doc: code.value, // начальный код
//   extensions: extensions // расширения (например, язык и тема)
// })

// const extensions = [
//   language.of(javascript()),
//   oneDark,
//   tabSize.of(EditorState.tabSize.of(8))
// ]

const extensions = ref([
  // language.of(javascript()),
  // javascript(),v
  htmlLanguage,
  // oneDark,
  // mytheme.of(ayuLight)
  // themeConfig.of([themes[1]])
  // themeConfig.of([themes[1].extension])
  // themeConfig.of(themes[1].extension)
  themes[0]
])

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view
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
  console.log('Event type:', eventType);
  console.log('Event object:', event);

  // EditorState.tabSize.of(16)

  //изменение состояния редактора
  const state = view.value.state // Получить текущее состояние редактора
  // const updatedText = state.doc.toString() // Получить содержимое
  // console.log('EditorState object:', updatedText);


  // view.value.dispatch({
  //   effects: tabSize.reconfigure(EditorState.tabSize.of(28))
  // })
// console.log(state.facet(EditorState.tabSize))


// const language = state.facet(EditorState.syntax).name.toLowerCase()
// const languag = language.get(state).name.toLowerCase()
  const languag =  state.facet(language)

  console.log('Current language: ', languag)

}


function changeTheme(ev) {
  console.log('Ch theme ',  ev.target.value)


  // currentTheme.value = themes[0].extension
  const selectedTheme = themes[Number(ev.target.value)];


  // extensions.value = [
  //   htmlLanguage,
  //   themes[2].extension
  // ]

  extensions.value = [
    htmlLanguage,
    selectedTheme
  ]
}

</script>

<template>

  <section>
    <select @change="changeTheme($event)">
      <option  v-for="(item, index) in themes" :key="index" :value="index">{{item.name}}</option>
    </select>



    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="myTabSize"
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

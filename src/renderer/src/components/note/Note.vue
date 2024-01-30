<script setup lang="ts">
import { useNotesStore } from '../../store/notes'
import Ccodemirror from "../codemirror/Ccodemirror.vue";
// import { themesList } from "../codemirror/themes";
// import { langList } from "../codemirror/langs";
// import {  langs } from "../codemirror/langs";


// const lang = langs

const notes = useNotesStore()

// const langDefault = langList[0 as keyof typeof langList].toString()
// const themeDefault = themesList[0 as keyof typeof themesList].toString()



// const allNotes = notes.listNotes

function addCode() {
  notes.addCodemirror(0)
}
</script>

<template>
  <header>
    <button @click="addCode">Add codemirror +</button>
  </header>
  <section>
<!--    <h2>Title: {{notes.listNotes[0][0].type}}</h2>-->

<!--    :lang="item.option.lang ? item.option.lang : langDefault"-->
<!--    :theme="item.option.theme ? item.option.theme : themeDefault"-->

    <ccodemirror v-for="(item, index) in notes.listNotes" class="ccodemirror"
                 :key="item"
                 :code="item.text"
                 :lang="item.option.lang"
                 :theme="item.option.theme"
                 :id="index">
    </ccodemirror>

  </section>
</template>

<style scoped>
.ccodemirror {
  margin-top: 20px;
}
</style>

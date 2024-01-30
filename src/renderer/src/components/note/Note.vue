<script setup lang="ts">
import { useNotesStore } from '../../store/notes'
import Ccodemirror from "../codemirror/Ccodemirror.vue";
// import {  langs } from "../codemirror/langs";


// const lang = langs

const notes = useNotesStore()


// const allNotes = notes.listNotes
</script>

<template>
  <section>
<!--    <h2>Title: {{notes.listNotes[0][0].type}}</h2>-->

    <ccodemirror v-for="(item, index) in notes.listNotes" :key="item" :code="item.text" :lang="item.option.lang" :theme="item.option.theme" :id="index"></ccodemirror>

  </section>
</template>

<style scoped>

</style>

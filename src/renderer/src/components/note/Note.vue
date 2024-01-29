<script setup lang="ts">
import { useNotesStore } from '../../store/notes'
import Ccodemirror from "../codemirror/Ccodemirror.vue";



const notes = useNotesStore()


// const allNotes = notes.listNotes
</script>

<template>
  <section>
    <h2>Title: {{notes.listNotes[0][0].type}}</h2>
    <ccodemirror></ccodemirror>
  </section>
</template>

<style scoped>

</style>

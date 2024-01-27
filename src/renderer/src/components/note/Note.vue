<script setup lang="ts">
import { useNotesStore } from '../../store/notes'

const notes = useNotesStore()

// const allNotes = notes.listNotes
</script>

<template>
  <section>
    <h2>Title: {{notes.listNotes[0].title}}</h2>
  </section>
</template>

<style scoped>

</style>

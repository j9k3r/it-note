<script setup lang="ts">

import { useNotesStore } from "../../store/notes";
import { computed, ref } from "vue";

const note = useNotesStore()

const searchValue = ref('')

const totalPages = computed(() => {
  return Math.ceil(note.noteList.notes.length / note.noteList.itemsPerPage);
})

const paginatedItems = computed(() => {
  const startIndex = (note.noteList.currentPage - 1) * note.noteList.itemsPerPage;
  const endIndex = startIndex + note.noteList.itemsPerPage;
  return note.noteList.notes.slice(startIndex, endIndex);
})

const searchedItems = computed(() => {
  if (searchValue.value) {
    return paginatedItems.value.filter(item => item.title.toLowerCase().includes(searchValue.value.toLowerCase()));
  } else {
    return paginatedItems.value;
  }
})

function updateCurrentPage(page) {
    note.updateCurrentPage(page);
}

</script>

<template>
  <header>
    <input v-model="searchValue" placeholder="Поиск по title" />
  </header>
  <section>
    <dl v-for="(item, index) in searchedItems" :key="index" class="note">
      <dt class="note-title">
        <h3>{{item.id}} - {{ item.title }}</h3>
      </dt>
      <dd>
        {{item.description}}
      </dd>
    </dl>
  </section>
  <footer>
    <ul>
      <li v-for="page in totalPages" :key="page">
        <button @click="updateCurrentPage(page)">{{ page }}</button>
      </li>
    </ul>
  </footer>

</template>

<style scoped>
.note {
  padding-top: 10px;
  padding-bottom: 10px;
}

footer {
  ul {
    display: flex;
  }
}
</style>

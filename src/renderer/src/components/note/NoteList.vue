<script setup lang="ts">

import { useNotesStore } from "../../store/notes";
import { computed, ref } from "vue";

const note = useNotesStore()

const searchValue = ref('')

const totalPages = computed(() => {
  return Math.ceil(searchedAndPaginatedItems.value.length / note.noteList.itemsPerPage);
})

const searchedAndPaginatedItems = computed(() => {
  const filteredItems = searchValue.value
    ? note.noteList.notes.filter(item => item.title.toLowerCase().includes(searchValue.value.toLowerCase()))
    : note.noteList.notes;

  return filteredItems;
});

const paginatedItems = computed(() => { //Todo перенести в searchedAndPaginatedItems
  const startIndex = (note.noteList.currentPage - 1) * note.noteList.itemsPerPage;
  const endIndex = startIndex + note.noteList.itemsPerPage;
  return searchedAndPaginatedItems.value.slice(startIndex, endIndex);
})

const updateItemsPerPage = (num) => {
  note.noteList.itemsPerPage = num; //Todo вынести в стор
};
function updateCurrentPage(page) {
    note.updateCurrentPage(page);
}

</script>

<template>
  <header>
    <input v-model="searchValue" placeholder="Поиск по title" />
  </header>
  <section>
    <dl v-for="(item, index) in paginatedItems" :key="index" class="note">
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

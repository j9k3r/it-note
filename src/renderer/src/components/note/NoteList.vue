<script setup lang="ts">

import { useNotesStore } from "../../store/notes";
import { computed, onMounted, ref } from "vue";

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
  if(num)
    note.noteList.itemsPerPage = num
}
function updateCurrentPage(page) {
    note.updateCurrentPage(page);
}

// onMounted(() => {
//   window.api.db.api.getAllNotes().then((result) => {
//     note.noteList.notes = result
//     console.log(result);
//   })
//     .catch((error) => {
//       console.error(error);
//     });
// })
</script>

<template>
  <header>
    <div id="element-viwer">
      <div>
        <label>на стр:</label>
        <input :value="note.noteList.itemsPerPage" @input="updateItemsPerPage($event.target.value)" type="number">
      </div>
      <div>
        <label>поиск:</label>
        <input v-model="searchValue" placeholder="Поиск по title" />
      </div>
    </div>
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

header {
  #element-viwer {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Две одинаковые колонки */
    gap: 10px; /* Отступ между элементами */
  }
}

footer {
  ul {
    display: flex;
  }
}
</style>

<script setup lang="ts">
import { useNotesStore } from '../../store/notes'
import { computed, onMounted, ref } from 'vue'
import { Note } from '../../interfaces'

const note = useNotesStore()

const searchValue = ref('')

const totalPages = computed<number>(() => {
  return Math.ceil(searchedAndPaginatedItems.value.length / note.noteList.itemsPerPage)
})

const searchedAndPaginatedItems = computed<Note[]>(() => {
  return searchValue.value
    ? note.noteList.notes.filter((item) =>
        item.title.toLowerCase().includes(searchValue.value.toLowerCase())
      )
    : note.noteList.notes
})

const paginatedItems = computed<Note[]>(() => {
  const startIndex = (note.noteList.currentPage - 1) * note.noteList.itemsPerPage
  const endIndex = startIndex + note.noteList.itemsPerPage
  return searchedAndPaginatedItems.value.slice(startIndex, endIndex)
})

const updateItemsPerPage = (num: number) => {
  if (num) note.noteList.itemsPerPage = num
}
function updateCurrentPage(page: number) {
  note.updateCurrentPage(page)
}

// onBeforeMount(() => {
//   note.noteList.currentPage = 1
//   note.noteList.itemsPerPage = 5
//     // {currentPage: 1, ItemsPerPag: 5}
//   // note.updateCurrentPage(1)
//   // note.updateItemsPerPage(4)
// })

onMounted(() => {
  note.initAllNotes()
})
</script>

<template>
  <header>
    <div id="element-viwer">
      <div>
        <label>на стр:</label>
        <input
          :value="note.noteList.itemsPerPage"
          type="number"
          @input="updateItemsPerPage($event.target.value)"
        />
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
        <router-link :to="{ name: 'noteEdit', params: { noteId: item._id } }">
          <h3>{{ item._id }} - {{ item.title }}</h3></router-link
        >
      </dt>
      <dd>
        {{ item.description }}
        <h6>{{ item.createdAt }}</h6>
      </dd>
      <button @click="note.deleteNote(item._id)">del x</button>
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

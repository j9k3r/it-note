<script setup lang="ts">
import { useNotesStore } from '../../store/notes'
import ContentWrapper from "../codemirror/ContentWrapper.vue";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";


const route = useRoute()
const router = useRouter()

const notes = useNotesStore()

const props = defineProps({
  noteId: {
    type: String,
    required: false
  }
})

// const langDefault = langList[0 as keyof typeof langList].toString()
// const themeDefault = themesList[0 as keyof typeof themesList].toString()

function addCode(type: string) {
  notes.addElement(0, type)
}

onMounted(() => {
  // if (route.name === 'noteCreate') {
  //   notes.note = {
  //     content: []
  //   }
  // }

  if (route.name === 'noteEdit') {

    console.log('note_id ' ,props.noteId)
    window.api.db.api.getNoteById(props.noteId).then((result) => {
      notes.note = result
      console.log(result);
    })
      .catch((error) => {
        console.error(error);
      });
  }
})

function removeNote() {
  window.api.db.api.deleteNoteById(props.noteId).then(() => {
    notes.updateCurrentPage(1)
    router.push({ name: 'noteList'})
  })
    .catch((error) => {
      console.error(error);
    })
}
</script>

<template>
  <header>
    <div id="main-content">
      <span v-if="route.name !== 'noteCreate'">
        Id: {{notes.note._id}}
<!--        propsId: {{ props.noteId }}<br>-->
      </span>
      Заголовок: <input v-model="notes.note.title">
      Описание: <textarea v-model="notes.note.description"></textarea>
    </div>

    <button @click="addCode('codemirror')">code +</button>
    <button @click="addCode('textWrapp')">text +</button>
  </header>
  <section>

    <content-wrapper
      v-for="(item, index) in notes.note.content"
      :id="index"
      :key="item"
      class="ccodemirror"
      :code="item.text"
      :lang="item.option.lang"
      :theme="item.option.theme"
      :type="item.type"
    >
    </content-wrapper>
  </section>
  <footer>
    <button v-if="route.name === 'noteCreate'" @click="notes.createNote()">Создать</button>
    <div v-else>
      <button @click="removeNote()">Удалить</button>
      <button @click="notes.updatedNote(props.noteId)">Обновить</button>
    </div>

<!--    <button @click="addN()">Сохранить</button>-->
  </footer>
</template>

<style scoped>
#main-content {
  display: flex;
  flex-direction: column;
  textarea {
    height: 80px;
  }
}
.ccodemirror {
  margin-top: 20px;
}
</style>

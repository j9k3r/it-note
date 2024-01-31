<script setup lang="ts">
import { useNotesStore } from '../../store/notes'
import ContentWrapper from "../codemirror/ContentWrapper.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

// import { themesList } from "../codemirror/themes";
// import { langList } from "../codemirror/langs";
// import {  langs } from "../codemirror/langs";


// const lang = langs

const route = useRoute()

const notes = useNotesStore()

const props = defineProps({
  noteId: {
    type: Number,
    required: false
  }
})

// const langDefault = langList[0 as keyof typeof langList].toString()
// const themeDefault = themesList[0 as keyof typeof themesList].toString()


// const allNotes = notes.note

function addCode(type: string) {
  notes.addElement(0, type)
}

onMounted(() => {
  if (route.name === 'noteCreate') {
    // console.log(route.name)
    notes.note = {
      // id: 0,
      // title: '',
      // description: '',
      // tags: [],
      content: []
    }
  }
})

</script>

<template>
  <header>
    <div id="main-content">
      <span v-if="route.name !== 'noteCreate'">
        storeId: {{notes.note.id}}
        propsId: {{ props.noteId }}<br>
      </span>
      Заголовок: <input v-model="notes.note.title">
      Описание: <textarea v-model="notes.note.description"></textarea>
    </div>

    <button @click="addCode('codemirror')">code +</button>
    <button @click="addCode('textWrapp')">text +</button>
  </header>
  <section>
<!--    <h2>Title: {{notes.note[0][0].type}}</h2>-->

<!--    :lang="item.option.lang ? item.option.lang : langDefault"-->
<!--    :theme="item.option.theme ? item.option.theme : themeDefault"-->

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

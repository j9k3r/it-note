<script setup lang="ts">
// import { defineProps, PropType } from 'vue';
import { PropType } from 'vue';
import { HtmlResultType } from "../main.types";
// import { inject } from "vue";

// const error = inject('error'); // Получаем ошибку из provide

// Теперь вы можете работать с ошибкой, например, отобразить ее
// console.log('Ошибка', error);

const props = defineProps({
  sessionValue: {
    type: Array as PropType<HtmlResultType[]>,
    required: true
  }

})


</script>

<template>
  <section>
    <div>Ошибка</div>

    <ul v-for="item in props.sessionValue" :key="item">
      <li>{{ item.errorMsgStr }}</li>
    </ul>
  </section>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { computed, inject, PropType, watch } from "vue";
import { ResultHtmlType, ResultType } from '../main.types'
import { useRoute } from 'vue-router'

const props = defineProps({
  // metaError: {
  //   type: Array as PropType<ResultHtmlType[]>,
  //   required: false
  // },
  // errComponents: {
  //   type: Array as PropType<any[]>,
  //   required: false
  // }
})

const emits = defineEmits(['emSumError'])

const errComponents = inject('errComponents')

const route = useRoute()

// const metaError = computed<ResultHtmlType[]>(() => {
//   if (route.meta && 'errors' in route.meta)
//     return route.meta.errors;
//   return [] as PropType<ResultHtmlType[]>
// })

const metaError = computed<ResultType[]>(() => {
  if (route.meta && 'errors' in route.meta)
    return route.meta.errors;
  return [] as PropType<ResultType[]>
})

const sumError = computed(() => {
  return metaError.value.length + errComponents.value.length
})

// function fSumError() {
//   return sumError
// }

watch(sumError, (newVal) => {
    // fSumError()
  // $emit('fSumError', sumError)
  emits('emSumError', newVal)
}, {immediate: true})
</script>

<template>
  <section>
<!--    <button @click="$emit('fSumError', $event)">emit</button>-->
    <div>Ошибка навигации</div>
    <ul v-for="(item, index) in metaError" :key="index" class="navErrors">
<!--      <li>{{ item.errorMsgStr }}</li>-->
      <li>{{ item.error.message }}

        <details>
          <summary>stack trace</summary>
          <pre>{{item.error.stack}}</pre>
        </details>

      </li>
    </ul>


    <div>Ошибка</div>
    <ul v-for="(item, index) in errComponents" :key="index" class="cmpErrors">
      <li>{{ item.component._?.type?.__name || item.componentName }}</li>
<!--      <li>111111</li>-->
    </ul>


  </section>
</template>

<style scoped>
.navErrors {
  color: yellow;
}
.cmpErrors {
  color: red;
}

pre {
  background-color: grey;
  color: darkblue;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
}
</style>

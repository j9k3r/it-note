<script setup lang="ts">
import { computed, inject, Ref, watch } from 'vue'
import { ResultErrCapturedType, ResultType } from '../main.types'
import { useRoute } from 'vue-router'

// const props = defineProps({
// metaError: {
//   type: Array as PropType<ResultHtmlType[]>,
//   required: false
// },
// errComponents: {
//   type: Array as PropType<any[]>,
//   required: false
// }
// })

const emits = defineEmits<{
  (e: 'emSumError', id: number): void
}>()

// const errComponents: Ref<ResultErrCapturedType[]> = inject('errComponents')
const errComponents = inject('errComponents') as Ref<ResultErrCapturedType[]> || [] as ResultErrCapturedType[]


const route = useRoute()

const metaError = computed<ResultType[]>(() => {
  if (route.meta && 'errors' in route.meta) {
    return route.meta.errors as ResultType[]
  }
  return [] as ResultType[]
})

const sumError = computed<number>(() => {
  return metaError.value.length + errComponents.value.length
})

watch(
  sumError,
  (newVal) => {
    emits('emSumError', newVal)
  },
  { immediate: true }
)
</script>

<template>
  <section id="component-error">
    <button @click="() => { throw new Error('test err in ErrorComponent') }" style="height: 30px">СОздать ошибку ercmp</button>
    <div>
      <h2>Ошибка навигации error {{ metaError.length }}</h2>
      <dl v-for="(item, index) in metaError" :key="index" class="navErrors">
        <dt v-if="item.error" class="msg">
          <h4>{{ item.error.message }}</h4>
        </dt>
        <dd v-if="item.error">
          <details>
            <summary>stack trace</summary>
            <pre>{{item.error.stack}}</pre>
          </details>
        </dd>
      </dl>
    </div>

    <div>
      <h2>Ошибка внутри компонента {{ errComponents.length }}</h2>
      <dl v-for="(item, index) in errComponents" :key="index" class="cmpErrors">
        <dt v-if="item.error" class="msg">
          <h4>{{ item.error.message }}</h4>
        </dt>
        <dd v-if="item.error">
          Вызвана в <span class="cmp-name">{{ item.component._?.type?.__name || item.componentName }}</span>
          <details>
            <summary>stack trace</summary>
            <pre>{{item.error.stack}}</pre>
          </details>
        </dd>
      </dl>
    </div>


  </section>
</template>

<style scoped>
#component-error {
  padding: 15px;
  border: 2px solid grey;
  border-radius: 15px;
  .navErrors {
    color: yellow;
  }

  .cmpErrors {
    color: yellow;
    .cmp-name {
      color: mediumseagreen;
    }
  }

  details {
    padding: 2px 0px 2px 10px;
  }

  pre {
    background-color: grey;
    color: darkblue;
    padding: 10px;
    border-radius: 5px;
    white-space: pre-wrap;
  }

  .msg {
    color: red;
  }

  dl {
    padding: 5px;
  }

  summary {
    color: #9feaf9;
  }
}
</style>

<script setup lang="ts">
import { onErrorCaptured, provide, ref, Ref } from 'vue'
import { RouterView } from 'vue-router'
import Layout from '@/layouts/Layout.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { ResultErrCapturedType } from './main.types'

const errComponents: Ref<ResultErrCapturedType[]> = ref([] as ResultErrCapturedType[])

const errQua: Ref<number> = ref(0)
const showErr: Ref<boolean> = ref(true)

// Логирование ошибки
const logError = (error: Error, component, info: string) => {
  const eErr = { result: false, error: error, component: component, info: info, componentName: '' }
  if (component?.type?.name) {
    eErr.componentName = component.type.name
  } else {
    eErr.componentName = 'Имя компонента не найдено'
  }
  errComponents.value.push(eErr)
  console.log('Ошибка перехвачена')
}

// Вызывается при монтировании компонента
// onMounted(() => {
// пример ошибки
// throw new Error('Пример ошибки');
// })

// Обработка ошибок в компоненте
onErrorCaptured(logError)
provide('errComponents', errComponents)

function cbSumErr(ev: number) {
  errQua.value = ev
}
</script>

<template>
  <div>
    <div id="errState">
      <span>Ошибок: {{ errQua }}</span>
      <span>Скрыть: <a @click="showErr = !showErr">{{ !showErr? 'Вкл': 'Выкл' }}</a></span>
    </div>
    <ErrorComponent
      v-show="errQua !== 0 && showErr"
      :err-components="errComponents"
      @em-sum-error="cbSumErr($event)"
    ></ErrorComponent>
  </div>

  <Layout>
    <RouterView />
  </Layout>
</template>

<style>
#errState {
  display: flex;
  justify-content: right;
  span {
    padding: 5px;
  }
}
</style>

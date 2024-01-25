<script setup type="ts">
import { computed, onErrorCaptured, provide, Ref, ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import Layout from "./layouts/Layout.vue";
import ErrorComponent from "./components/ErrorComponent.vue";
import { ResultErrCapturedType } from "./main.types";

// import * as vm from "vm";

// const errComponents: Ref<ResultErrCapturedType[]> = ref([] as ResultErrCapturedType[]);
const errComponents: Ref<ResultErrCapturedType[]> = ref<ResultErrCapturedType[]>([]);

const errQua = ref(0)
const showErr = ref(true)

// Логирование ошибки
const logError = (error, component, info) => {
  const eErr = {error: error, component: component, info: info, componentName: ''}
  if (component?.type?.name) {
    eErr.componentName = component.type.name
    // console.error('Имя компонента', component.type.name);
  } else {
    eErr.componentName = 'Имя компонента не найдено'
    // console.error('Имя компонента не найдено');
  }
  errComponents.value.push(eErr);
  // errComponents.value.push(eErr);


  console.log('Ошибка перехвачена')


  // console.error('Ошибка в компоненте', component);
  // console.error('Ошибка', error);
  // console.error('Стек вызовов', info);
};

// Вызывается при монтировании компонента
// onMounted(() => {
  // Размещение примера ошибки
  // throw new Error('Пример ошибки');
// });



// Обработка ошибок в компоненте
onErrorCaptured(logError);
provide('errComponents', errComponents)


// const countErrComponent = computed(() => errComponents.value.length);


function cbSumErr(ev) {
  errQua.value = ev
  // console.log(ev)
}

</script>

<template>

<!--  v-if="countErrComponent !== 0"-->
<!--  :meta-error="metaError"-->
  <div>
    <div id="errState">
      <span>Ошибок: {{ errQua }}</span>
      <span>Скрыть: <a @click="showErr = !showErr">{{ !showErr? 'Вкл': 'Выкл' }}</a></span>
    </div>
    <ErrorComponent
      v-show="errQua.value !== 0 && showErr"
      :err-components="errComponents"
      @em-sum-error="cbSumErr($event)"
    ></ErrorComponent>
  </div>
<!--  <Layout :err-components="errComponents">-->

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

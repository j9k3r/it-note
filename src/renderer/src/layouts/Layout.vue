<script setup type="ts">
import { useRoute } from "vue-router";
// import {
//   computed,
// } from "vue";
// import ErrorComponent from "../components/ErrorComponent.vue";
// import { ResultHtmlType } from "../main.types";

// const props = defineProps({
//   errComponents: {
//     type: Array,
//     required: false
//   }
// })

// const countErrCompnent = computed(() => props.errComponents.length);

const route = useRoute()

// const metaError = computed(() => {
//   if (route.meta && 'errors' in route.meta)
//     return route.meta.errors;
//   return []
// })


function crErr () {
  throw new Error('Пример ошибки');
}
</script>


<template>
  <button @click="crErr" style="height: 30px">СОздать ошибку</button>
  <!--    v-if="metaError.length !== 0 || props.errComponents.length !== 0"-->
<!--  <ErrorComponent-->
<!--    v-if="countErrCompnent !== 0"-->
<!--    :meta-error="metaError"-->
<!--    :err-components="errComponents"-->
<!--  ></ErrorComponent>-->
  <component :is="route.meta.layoutComponent">
    <slot />
  </component>
</template>

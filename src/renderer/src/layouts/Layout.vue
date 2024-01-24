<script setup type="ts">
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch, onErrorCaptured, onBeforeUnmount, onBeforeMount, watchEffect } from "vue";
import Error from "../components/Error.vue";
// import { HtmlResultType } from "../main.types";

const route = useRoute()
const router = useRouter()


// const sessionValue = ref([])

//значение из сессии
const sessionValue = computed(() => JSON.parse(sessionStorage.getItem('Errors')) || [] )

// const sessionValue = ref(sessionStorage.getItem('Errors') || []);

// Используем хук watch для отслеживания изменений в сессии

// watch( () => sessionStorage.getItem('Errors'), (newValue) => {
//   sessionValue.value = JSON.parse(newValue) || [];
// }, { immediate: true });

// onMounted(async () => {
//   const errors = JSON.parse(sessionStorage.getItem('Errors')) || [];
//   sessionValue.value = errors;
// });



// const errors = ref([]);
//
// const updateErrorsFromSessionStorage = () => {
//   const storedErrors = sessionStorage.getItem('Errors');
//   errors.value = storedErrors ? JSON.parse(storedErrors) : [];
// };
//
// watchEffect(updateErrorsFromSessionStorage);



// onBeforeMount(() => {
//
// })

// onBeforeRouteLeave(() => {
//   sessionStorage.removeItem('Errors')
// })

// onBeforeUnmount(() => {
//     sessionStorage.removeItem('Errors')
// })



</script>

<template>
  <Error v-if="sessionValue.length !== 0" :session-value="sessionValue"></Error>
  <component :is="route.meta.layoutComponent">
    <slot />
  </component>
</template>

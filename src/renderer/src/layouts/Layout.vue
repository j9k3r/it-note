<script setup type="ts">
import { useRoute } from 'vue-router';
// import Error from "../components/Error.vue";
const route = useRoute();
</script>

<template>
<!--  <Error></Error>-->
  <component :is="route.meta.layoutComponent">
    <slot />
  </component>
</template>

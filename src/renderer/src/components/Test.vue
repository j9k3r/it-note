<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const test = ref()
const route = useRoute()
onMounted( () => {
  test.value = route.params.test
})

</script>

<template>
<div>
  <h1>Test component</h1>
  <router-link :to="{'name':'home'}">home page</router-link>
  <div>
    <h2>
      check router, param = {{test}}
    </h2>
  </div>
</div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  modelValue: String
})

const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <section>
    <textarea :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
  </section>
</template>

<style scoped>
textarea {
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">

</script>

<template>
  <header>
    This header
    <nav>
      <ul>
        <li><router-link :to="{'name':'noteCreate'}">Note create</router-link></li>
        <li><router-link :to="{'name':'noteList'}">Note List</router-link></li>
      </ul>
    </nav>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    This footer
  </footer>

</template>

<style scoped>
</style>

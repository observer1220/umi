<template>
  <div class="content">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.content {
  width: 80vw;
  max-width: 1124px;
  margin: 0 auto;
  margin-top: 24px;
}
</style>

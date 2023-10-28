<template>
  <template v-if="$route.name !== 'login'">
    <Header />
    <TheLayout>
      <router-view />
    </TheLayout>
    <Footer :class="{ inside: $route.name === 'login' }" />
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script setup lang="ts">
import "./assets/base.css";
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import TheLayout from "./components/layout/TheLayout.vue";
</script>



<template>
  <template v-if="$route.name !== 'login'">
    <div :class="generalStore.backgroundMode == 'sun' ? 'whiteMode' : 'darkMode'">
      <Header />
      <Container>
        <router-view />
      </Container>
      <Footer :class="{ inside: $route.name === 'login' }" />
    </div>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script setup lang="ts">
import "./assets/base.css";
import Header from "./components/layout/Header.vue";
import Container from "./components/layout/Container.vue";
import Footer from "./components/layout/Footer.vue";
import { useGeneralStore } from "./store/general";
const generalStore = useGeneralStore();
</script>

<style scoped>
.whiteMode {
  background-color: #f5f5f5;
  color: black;
  transition: all 0.5s ease-in-out;
}

.darkMode {
  background-color: #333;
  color: white;
  transition: all 0.5s ease-in-out;
}
</style>

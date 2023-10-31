<template>
  <template v-if="$route.name !== 'login'">
    <Header />
    <Container>
      <router-view />
    </Container>
    <Footer :class="{ inside: $route.name === 'login' }" />
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
</script>



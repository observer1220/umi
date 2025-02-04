<template>
  <div class="loading-container">
    <div class="animated-overlay"></div>
    <div class="content">
      <FunnelIcon class="icon" />
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FunnelIcon } from '@heroicons/vue/24/outline';
</script>

<style scoped>
.loading-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 50;
}

.animated-overlay {
  position: absolute;
  inset: 0;
  background-color: #a6e1fa;
  animation: slide 2s linear infinite;
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.content p {
  margin-top: 16px;
  font-size: 1.125rem;
  font-weight: 600;
  color: #4a4a4a;
}

.icon {
  width: 4rem;
  height: 4rem;
  color: #1e40af;
  animation: bounce 1s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>


<!-- <template>
  <div class="container">Loading...</div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 2rem;
  color: white;
  background-color: black;
  opacity: 0.8;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}
</style> -->
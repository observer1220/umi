<template>
  <div>
    <PostList v-for="post in searchResult" :post="post" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PostList from "../components/PostList.vue";
import { usePostStore } from "../store/post";

const usePost: any = usePostStore();

const searchResult = computed(() => usePost.state.searchResult);
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>

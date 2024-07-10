<template>
  <div>
    <h2 class="title">搜尋結果：{{ term }}</h2>
    <PostList v-for="post in searchResult" :post="post" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PostList from "../components/PostList.vue";
import { useRoute } from "vue-router";
import { usePostStore } from "../store/post";

const route = useRoute();
const usePost: any = usePostStore();

const searchResult = computed(() => usePost.searchResult);
const term = computed(() => route.params.term);
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>

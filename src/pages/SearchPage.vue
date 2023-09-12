<template>
  <div>
    <h2 class="title">搜尋結果：{{ term }}</h2>
    <PostList>
      <PostItem v-for="post in searchResult" :post="post" />
    </PostList>
  </div>
</template>

<script setup lang="ts">
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePostStore } from "../store/post";

const route = useRoute();
const usePost = usePostStore();

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

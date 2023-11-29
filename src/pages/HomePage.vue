<template>
  <div class="container">
    <PostList v-for="post in posts" :post="post" :key="post.id" />
    <PostDetails v-if="showPostDetails" />
    <PostUpload v-if="showPostUpload" />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import PostList from "../components/PostList.vue";
import PostUpload from "../components/PostUpload.vue";
import PostDetails from "../components/PostDetails.vue";
import { useGeneralStore } from "../store/general";
import { usePostStore } from "../store/post";

const useGeneral = useGeneralStore();
const usePost = usePostStore();

const showPostUpload = computed(() => useGeneral.showPostUpload);
const showPostDetails = computed(() => useGeneral.showPostDetails);
const posts: any = computed(() => usePost.list);

onMounted(() => {
  usePost.loadAllPosts();
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

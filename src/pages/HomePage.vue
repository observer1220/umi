<template>
  <div class="container">
    <Loading v-if="state.isLoading" />
    <PostList v-for="post in state.posts" :post="post" :key="post.id" />
    <PostDetails v-if="state.showPostDetails" />
    <PostUpload v-if="state.showPostUpload" />
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import PostList from "../components/PostList.vue";
import PostUpload from "../components/PostUpload.vue";
import PostDetails from "../components/PostDetails.vue";
import { useGeneralStore } from "../store/general";
import { usePostStore } from "../store/post";
import Loading from "../components/Loading.vue";

const useGeneral = useGeneralStore();
const usePost = usePostStore();

const state = reactive({
  showPostUpload: computed(() => useGeneral.showPostUpload),
  showPostDetails: computed(() => useGeneral.showPostDetails),
  posts: computed(() => usePost.state.list) as any,
  isLoading: computed(() => usePost.state.isLoading),
});

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

<template>
  <div>
    <PostList>
      <PostItem v-for="post in posts" :post="post" :key="post.id" />
    </PostList>
    <PostDetails v-if="showPostDetails" />
    <PostUpload v-if="showPostUpload" />
  </div>
</template>
<script setup lang="ts">
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import PostUpload from "../components/PostUpload.vue";
import PostDetails from "../components/PostDetails.vue";
import { useGeneralStore } from "../store/general";
import { usePostStore } from "../store/post";
import { computed, onMounted } from "vue";

const useGeneral = useGeneralStore();
const usePost = usePostStore();

const showPostUpload = computed(() => useGeneral.showPostUpload);
const showPostDetails = computed(() => useGeneral.showPostDetails);
const posts = computed(() => usePost.list);

onMounted(() => {
  usePost.loadAllPosts();
});
</script>
<style scoped></style>

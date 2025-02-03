<template>
  <div class="imageContainer">
    <img class="imageClass" v-for="post in posts" :src="post.image" :key="post.id" @click="pageAction.goToPost(post.id)"
      loading="lazy" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { usePostStore } from "../store/post";
defineProps({
  posts: {
    type: Object,
    default: {},
  },
});

const usePost: any = usePostStore();
const pageAction = reactive({
  goToPost(postId: number) {
    console.log('postId', postId);
    usePost.showPostDetails(postId);
  },
});
</script>

<style scoped>
.imageContainer {
  display: grid;

  /* Desktop 1fr 1fr 1fr */
  grid-template-columns: 1fr 1fr 1fr;

  /* Mobile 1fr 1fr */
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.imageClass {
  width: 100%;
  background: #eee;
  object-fit: contain;
  cursor: pointer;

  /* Styled image outline */
  border: 1px solid #ddd;
  border-radius: 14px;
  margin: 0.1rem;

  /* Hover effect */
  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s;
  }
}
</style>
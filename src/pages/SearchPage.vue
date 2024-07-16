<template>
  <!-- 搜尋框 -->
  <div class="searchInput">
    <input type="text" @change="pageAction.searchPosts" placeholder="搜尋" />
    <TheIcon icon="search" />
  </div>
  <!-- 顯示所有貼文 -->
  <div class="postsContainer">
    <img
      class="postImage"
      v-for="post in state.searchResult"
      :src="post.image"
      :key="post.id"
      @click="pageAction.goToPost(post.id)"
    />
  </div>
  <PostDetails v-if="state.showPostDetails" />
  <PostUpload v-if="state.showPostUpload" />
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import { usePostStore } from "../store/post";
import { useGeneralStore } from "../store/general";
import PostDetails from "../components/PostDetails.vue";
import PostUpload from "../components/PostUpload.vue";
import TheIcon from "../components/TheIcon.vue";

const usePost: any = usePostStore();
const useGeneral = useGeneralStore();

const state = reactive({
  searchResult: computed(() => usePost.state.searchResult),
  showPostDetails: computed(() => useGeneral.showPostDetails),
  showPostUpload: computed(() => useGeneral.showPostUpload),
});

const pageAction = reactive({
  goToPost(postId: number) {
    usePost.showPostDetails(postId);
  },
  searchPosts(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    usePost.searchPosts(target.value);
  },
});

onMounted(() => {
  pageAction.searchPosts({ target: { value: "" } } as any);
});
</script>

<style scoped>
.postsContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.postImage {
  width: 100%;
  background: #eee;
  object-fit: contain;
  cursor: pointer;
}

.searchInput {
  position: relative;
  margin-inline: 0.5em;
  margin-bottom: 0.5em;
}

.searchInput input {
  width: 100%;
  padding: 12px;
  padding-left: 36px;

  background: #e4e4e5;
  border-radius: 14px;
  border: none;
}

.searchInput > svg {
  position: absolute;
  left: 0;
  top: 11px;
  left: 12px;
}
</style>

<template>
  <div class="profileContainer">
    <Avatar :width="100" :height="100" :src="state.user?.user_metadata.avatar" />
    <div class="profile">
      <p class="name">
        <router-link to="/profile/edit">編輯個人資料</router-link>
      </p>
      <p class="handle">@{{ state.user?.user_metadata?.username }}</p>
      <div class="description">
        <pre>{{ state.user?.user_metadata?.brief }}</pre>
      </div>
    </div>
  </div>
  <div class="tabs">
    <div v-for="(tab, index) in state.tabs" class="tab" :class="{ active: index === state.currentTab }" :key="index"
      @click="state.currentTab = index">
      <Icon :icon="tab.icon" />
      <p>{{ tab.label }}</p>
    </div>
  </div>
  <div class="tabContent">
    <p>總貼文數：{{ state.myPosts[state.currentTab].length }}篇</p>
    <ImageList :posts="state.myPosts[state.currentTab]" />
  </div>
  <PostDetails v-if="state.showPostDetails" />
  <PostUpload v-if="state.showPostUpload" />

</template>

<script setup lang="ts">
import { reactive, watch, computed } from "vue";
import Icon from "../components/Icon.vue";
import Avatar from "../components/Avatar.vue";
import {
  loadPostsByMe,
  loadPostLikedByMe,
  loadPostFavoredByMe,
} from "../services/apiPost";
import { getUser } from "../utils/localStorage";
import { usePostStore } from "../store/post";
import { useGeneralStore } from "../store/general";
import PostDetails from "../components/PostDetails.vue";
import PostUpload from "../components/PostUpload.vue";
import ImageList from "../components/ImageList.vue";

const usePost = usePostStore();
const useGeneral = useGeneralStore();
const TABS = {
  MY: 0,
  LIKED: 1,
  FAVORED: 2,
};

const state = reactive({
  user: getUser(),
  tabs: [
    { label: "貼文", icon: "posts" },
    { label: "喜歡", icon: "like" },
    { label: "收藏", icon: "favorite" },
  ],
  currentTab: TABS.MY,
  myPosts: { [TABS.MY]: [], [TABS.LIKED]: [], [TABS.FAVORED]: [] } as any,
  showPostDetails: computed(() => useGeneral.showPostDetails),
  showPostUpload: computed(() => useGeneral.showPostUpload),
  isLoading: computed(() => usePost.state.isLoading),
});

watch(
  () => state.currentTab,
  async () => {
    const currentTabPosts: any = state.myPosts[state.currentTab];
    if (currentTabPosts.length === 0) {
      switch (state.currentTab) {
        case TABS.MY:
          currentTabPosts.push(
            ...(await loadPostsByMe(state.user.user_metadata.userId))
          );
          break;
        case TABS.LIKED:
          currentTabPosts.push(
            ...(await loadPostLikedByMe(state.user.user_metadata.username))
          );
          break;
        case TABS.FAVORED:
          currentTabPosts.push(
            ...(await loadPostFavoredByMe(state.user.user_metadata.username))
          );
          break;
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.profileContainer {
  width: 100%;
  display: grid;
  column-gap: 10vw;
  margin-top: 1em;
  grid-template-columns: 1fr 1fr 1fr;
}

.avatar {
  justify-self: end;
}

.profile .name {
  display: flex;
  align-items: center;
}

.profile .name>span {
  font-size: 26px;
}

.profile .name>a {
  color: #1da0ff;
  text-decoration: none;
}

.profile .handle {
  margin-top: 4px;
  color: #848484;
}

.profile .description {
  margin-top: 26px;
  margin-bottom: 22px;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(3, 88px);
  column-gap: 4vw;
  justify-content: center;

  margin-top: 7vmin;
  margin-bottom: 20px;
}

.tab {
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
}

.tab>svg {
  width: 32px;
  height: 32px;
  stroke: #8a9194;
  fill: #8a9194;
}

.tab.active {
  background: #f6f9fb;
  border-radius: 18px;
}

.tab.active>svg {
  stroke: #1787d9;
  fill: #1787d9;
}

.tab.active>p {
  color: #1787d9;
}

.tabContent>p {
  text-align: center;
  font-weight: 600;
  margin-bottom: 32px;
}
</style>
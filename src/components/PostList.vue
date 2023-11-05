<template>
  <div class="postList">
    <img class="postImage" :src="post.image" @click="usePost.showPostDetails(post.id)" />
    <div class="postInfo">
      <div class="postMeta">
        <TheAvatar :src="post?.user?.avatar" />
        <span class="postUsername">{{ post.username }}</span>
        <span class="postPubDate">
          {{ dateToRelative(post.created_at) }}
        </span>
        <PostActions :likes="likes" :comments="post.comments" :favors="favors" :likedByMe="likedByMe"
          :favoredByMe="favoredByMe" @likeClick="usePost.toggleLike(post.id, useUser.user?.user_metadata?.username)"
          @favorClick="usePost.toggleFavor(post.id, useUser.user?.user_metadata?.username)"
          @commentsClick="usePost.showPostDetails(post.id)" />
      </div>
      <div class="postDesc">
        <p>
          {{ post.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TheAvatar from "../components/TheAvatar.vue";
import PostActions from "../components/PostActions.vue";
import { dateToRelative } from "../utils/date";
import { usePostStore } from "../store/post";
import { useUserStore } from "../store/user";

const props = defineProps({
  post: {
    type: Object,
    default: {},
  },
});

const usePost = usePostStore();
const useUser = useUserStore();

// 計算按讚數
const likes = computed(() => {
  if (!props.post.liked_list) {
    return 0;
  }

  return props.post.liked_list.length;
});

// 比對使用者是否按過讚
const likedByMe = computed(() => {
  if (!props.post.liked_list) {
    return false;
  }

  return props.post.liked_list.includes(useUser.user?.user_metadata?.username);
});

// 計算收藏數
const favors = computed(() => {
  if (!props.post.favored_list) {
    return 0;
  }

  return props.post.favored_list.length;
});

// 比對使用者是否收藏
const favoredByMe = computed(() => {
  if (!props.post.favored_list) {
    return false;
  }

  return props.post.favored_list.includes(useUser.user?.user_metadata?.username);
});

</script>
<style scoped>
.postList {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  margin-bottom: 24px;
}

.postInfo {
  padding: 24px;
}

.postList>img {
  width: 100%;
  height: 300px;
  object-fit: contain;
  background: #eee;
  cursor: pointer;
}

.postMeta {
  display: grid;
  grid-template-areas:
    "avatar name actions"
    "pubDate pubDate actions";
  grid-template-columns: 42px 1fr 3fr;
  row-gap: 6px;
}

.postMeta .avatar {
  grid-area: avatar;
}

.postMeta .postUsername {
  display: flex;
  align-items: center;
}

.postMeta .postPubDate {
  grid-area: pubDate;
  color: #9f9f9f;
  font-size: 14px;
}

.postActions {
  grid-area: actions;
  justify-self: end;
}

.postDesc {
  margin-top: 28px;
  white-space: pre-line;
}
</style>

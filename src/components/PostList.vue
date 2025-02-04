<template>
  <div class="postContainer">
    <img v-if="post.image" class="postImage" :src="post.image" @click="usePost.showPostDetails(post.id)"
      loading="lazy" />
    <div class="postInfo">
      <div class="postDesc">
        <span v-html="post.description.slice(0, 54)"></span>
        <span v-if="post.description.length > 54">...</span>
      </div>
      <div class="postMeta">
        <Avatar :src="post?.user?.avatar" />
        <span class="postUsername">{{ post.username }}</span>
        <span class="postPubDate">
          {{ dateToRelative(post.created_at) }}
        </span>
        <PostActions :likes="likes" :comments="post.comments" :likedByMe="likedByMe" :favoredByMe="favoredByMe"
          @likeClick="usePost.toggleLike(post.id, useUser.user?.user_metadata?.username)"
          @favorClick="usePost.toggleFavor(post.id, useUser.user?.user_metadata?.username)"
          @commentsClick="usePost.showPostDetails(post.id)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Avatar from "../components/Avatar.vue";
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

// 比對使用者是否收藏
const favoredByMe = computed(() => {
  if (!props.post.favored_list) {
    return false;
  }

  return props.post.favored_list.includes(useUser.user?.user_metadata?.username);
});

</script>
<style scoped>
.postContainer {
  width: 335px;
  height: 450px;
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  margin-bottom: 0.5em;
}

.postInfo {
  padding: 0 0.5em;
}

.postContainer>img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  background: #eee;
  cursor: pointer;
}

.postMeta {
  display: grid;
  grid-template-areas:
    "avatar name actions"
    "pubDate pubDate actions";
  grid-template-columns: 42px 1fr 3fr;
  margin-top: 0.5em;
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
  max-height: 100px;
  font-size: 0.8rem;
}
</style>

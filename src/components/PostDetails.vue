<template>
  <TheModal @close="usePost.hidePostDetails">
    <div class="postDetailsContainer" v-if="state.post">
      <div class="postMeta">
        <div class="author">
          <TheAvatar :src="state.post?.user?.avatar" />
          <span>{{ state.post.username }}</span>
        </div>
      </div>
      <img class="postImage" :src="state.post.image" alt="" />
      <el-scrollbar>
        <div class="postDesc">
          {{ state.post?.description }}
        </div>
        <div class="comments">
          <div class="comment" v-for="comment in state.comments">
            <TheAvatar :src="comment.user?.avatar" />
            <span class="user">{{ comment.username }}</span>
            <span class="commentDate">
              {{ dateToRelative(comment.created_at) }}
            </span>
            <p class="commentContent">{{ comment.content }}</p>
          </div>
        </div>
      </el-scrollbar>

      <div class="actionsContainer">
        <!-- {{ state.post }} -->
        <PostActions
          :likes="likes"
          :favors="favors"
          :likedByMe="likedByMe"
          :favoredByMe="favoredByMe"
          :comments="state.post.comments"
          @likeClick="
            () => {
              usePost.toggleLike(
                state.post.id,
                state.user.user_metadata?.username
              );
            }
          "
          @favorClick="
            usePost.toggleFavor(
              state.post.id,
              state.user.user_metadata?.username
            )
          "
        />
        <span class="postPubDate">
          {{ dateToRelative(state.post.created_at) }}
        </span>
        <input
          type="text"
          name="comment"
          v-model="state.content"
          id=""
          class="commentInput"
          placeholder="請輸入您的留言..."
          v-on:keyup.enter="pageAction.createComment"
        />
        <button @click="pageAction.createComment" class="commentPubBtn">
          發佈
        </button>
      </div>
    </div>
  </TheModal>
</template>

<script setup lang="ts">
import { computed, reactive, watch, onMounted } from "vue";
import TheAvatar from "./TheAvatar.vue";
import TheModal from "./TheModal.vue";
import PostActions from "./PostActions.vue";
import { dateToRelative } from "../utils/date";
import { usePostStore } from "../store/post";
import { useCommentStore } from "../store/comment";
import { useUserStore } from "../store/user";

const usePost = usePostStore();
const useComment = useCommentStore();
const useUser = useUserStore();

const state = reactive({
  content: "",
  user: useUser.user,
  post: null as any,
  comments: computed(() => useComment.list) as any,
});

onMounted(async () => {
  state.post = usePost.postDetails();
});

const pageAction = reactive({
  async createComment() {
    await useComment.addComment({
      content: state.content,
      postId: state.post.id,
      userId: state.user.user_metadata.userId,
    });
  },
});

watch(state.comments, () => {
  state.content = "";
});

// 計算按讚數
const likes = computed(() => {
  if (!state.post.liked_list) {
    return 0;
  }

  return state.post.liked_list.length;
});

// 比對使用者是否按過讚
const likedByMe = computed(() => {
  if (!state.post.liked_list) {
    return false;
  }

  return state.post.liked_list.includes(useUser.user?.user_metadata?.username);
});

// 計算收藏數
const favors = computed(() => {
  if (!state.post.favored_list) {
    return 0;
  }

  return state.post.favored_list.length;
});

// 比對使用者是否收藏
const favoredByMe = computed(() => {
  if (!state.post.favored_list) {
    return false;
  }

  return state.post.favored_list.includes(useUser.user?.user_metadata?.username);
});
</script>

<style scoped>
.postDetailsContainer {
  width: 100%;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 1em;
}

.postImage {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

.postMeta {
  padding: 1em;
}

.author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.postDesc {
  padding: 10px;
  letter-spacing: 0.5px;
}

.comments {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  align-items: start;
  overflow-y: auto;
  height: 100%;
}

.comment {
  display: grid;
  grid-template-areas:
    "avatar name date"
    "comment comment comment";
  grid-template-columns: 34px 1fr 1fr;
  align-items: center;
  column-gap: 10px;
  row-gap: 10px;
  padding: 10px;
}

.commentDate {
  grid-area: date;
  justify-self: end;
  color: #a7a7a7;
}

.commentContent {
  grid-area: comment;
}

.actionsContainer {
  border-top: 1px solid #eaeaea;
  display: grid;
  align-items: center;
  padding: 0.5em;
  /* row-gap: 16px; */
}

.postActions > :deep(svg) {
  transform: scale(0.8125);
}

.postPubDate {
  color: #9f9f9f;
  grid-column: 2 / 6;
  justify-self: end;
  font-size: 14px;
}

.commentInput {
  background: #f7f7f7;
  border-radius: 16px;
  border: none;
  grid-column: 1 / 4;
}

.commentInput::placeholder {
  color: #b9b9b9;
  border: none;
}

.commentPubBtn {
  color: #1da0ff;
  border: none;
  background: none;
  font-size: 16px;
  margin-left: 20px;
  grid-column: 4 / 6;
}
</style>

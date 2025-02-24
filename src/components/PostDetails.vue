<template>
  <Modal @close="usePost.hidePostDetails">
    <div class="postDetailsContainer" v-if="state.post">
      <div class="postMeta">
        <div class="author">
          <Avatar :src="state.post?.user?.avatar" />
          <span>{{ state.post.username }}</span>
        </div>
      </div>
      <img class="postImage" :src="state.post.image" alt="" loading="lazy" />
      <el-scrollbar>
        <div class="postDesc">
          <p v-html="state.post?.description" />
        </div>
        <div class="comments">
          <div class="comment" v-for="comment in state.comments">
            <Avatar :src="comment.user?.avatar" />
            <span class="user">{{ comment.username }}</span>
            <span class="commentDate">
              {{ dateToRelative(comment.created_at) }}
            </span>
            <p class="commentContent" v-html="comment.content" />
          </div>
        </div>
      </el-scrollbar>

      <div class="actionsContainer">
        <PostActions :likes="likes" :likedByMe="likedByMe" :favoredByMe="favoredByMe" :comments="state.post.comments"
          @likeClick="() => {
            usePost.toggleLike(
              state.post.id,
              state.user.user_metadata?.username
            );
          }
            " @favorClick="
              usePost.toggleFavor(
                state.post.id,
                state.user.user_metadata?.username
              )
              " />
        <span class="postPubDate">
          {{ dateToRelative(state.post.created_at) }}
        </span>
        <textarea class="commentInput" name="comment" v-model="state.content" placeholder="請輸入您的留言..."
          v-on:keyup.enter="pageAction.createComment" />
        <button @click="pageAction.createComment" class="commentPubBtn">
          發佈
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { computed, reactive, watch, onMounted } from "vue";
import Avatar from "./Avatar.vue";
import Modal from "./Modal.vue";
import PostActions from "./PostActions.vue";
import { dateToRelative } from "../utils/date";
import { usePostStore } from "../store/post";
import { useCommentStore } from "../store/comment";
import { useUserStore } from "../store/user";
import { ElNotification } from "element-plus";

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
    if (state.content === "") {
      ElNotification({
        title: "Error",
        message: "Post content cannot be empty",
        type: "error",
      });
    } else {
      await useComment.addComment({
        content: state.content,
        postId: state.post.id,
        userId: state.user.user_metadata.userId,
      });
    }
  },
});

watch(state.comments, () => {
  state.content = "";
});

// Calculate the number of likes
const likes = computed(() => {
  if (!state.post.liked_list) {
    return 0;
  }

  return state.post.liked_list.length;
});

// Comapre if the user liked the post
const likedByMe = computed(() => {
  if (!state.post.liked_list) {
    return false;
  }

  return state.post.liked_list.includes(useUser.user?.user_metadata?.username);
});

// Compare if the user favored the post
const favoredByMe = computed(() => {
  if (!state.post.favored_list) {
    return false;
  }

  return state.post.favored_list.includes(
    useUser.user?.user_metadata?.username
  );
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
  padding: 0.5em;
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
  padding: 0.5em 1em;
  row-gap: 0.5em;
}

.postActions> :deep(svg) {
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

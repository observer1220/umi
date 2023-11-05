import { ref } from "vue";
import { defineStore } from "pinia";
import { createComment, loadComments } from "../services/apiComment";

export const useCommentStore = defineStore("comment", () => {
  const list = ref([]);

  const initializeComments = (comments) => {
    list.value = comments;
  };

  // 新增評論
  const addComment = async (content, postId, userId) => {
    await createComment(content, postId, userId);
    loadAllComments(postId);
    increaseCommentCount(postId);
  };

  const loadAllComments = async (postId) => {
    const comments = await loadComments(postId);
    initializeComments(comments);
  };

  const increaseCommentCount = (postId) => {
    const post = list.value.find((post) => post.id === postId);
    post.comments++;
  };

  return {
    list,
    initializeComments,
    addComment,
    loadAllComments,
    increaseCommentCount,
  };
});

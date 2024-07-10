import { ref } from "vue";
import { defineStore } from "pinia";
import { createComment, loadComments } from "../services/apiComment";

export const useCommentStore = defineStore("comment", () => {
  const list: any = ref([]);

  const initializeComments = (comments: any[]) => {
    list.value = comments;
  };

  // 新增評論
  const addComment = async (content: any, postId: any, userId: any) => {
    // console.log("addComment", content, postId, userId);
    await createComment(content, postId, userId);
    loadAllComments(postId);
    increaseCommentCount(postId);
  };

  const loadAllComments = async (postId: any) => {
    const comments = await loadComments(postId);
    initializeComments(comments);
  };

  const increaseCommentCount = (postId: any) => {
    const post = list.value.find((post: any) => post.post_id === postId);
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

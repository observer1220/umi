import { ref } from "vue";
import { defineStore } from "pinia";
import { createComment, loadComments } from "../services/apiComment";
import { Comment } from "../types/comment";

export const useCommentStore = defineStore("comment", () => {
  const list: any = ref([]);
  const initializeComments = (comments: any[]) => {
    list.value = comments;
  };

  const addComment = async ({ content, postId, userId }: Comment) => {
    await createComment({ content, postId, userId });
    loadAllComments(postId);
    increaseCommentCount(postId);
  };

  const loadAllComments = async (postId: number) => {
    const comments = await loadComments(postId);
    initializeComments(comments);
  };

  const increaseCommentCount = (postId: number) => {
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

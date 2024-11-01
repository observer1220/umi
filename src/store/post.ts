import { reactive } from "vue";
import { defineStore } from "pinia";
import {
  createPost,
  loadPosts,
  likePost,
  favorPost,
} from "../services/apiPost";
import { useGeneralStore } from "./general";
import { useCommentStore } from "./comment";
import { PostState, Post } from "../types/post";

export const usePostStore = defineStore("post", () => {
  const { changeShowPostUpload, changeShowPostDetails } = useGeneralStore();
  const { loadAllComments } = useCommentStore();

  const state = reactive<PostState>({
    list: [],
    searchResult: [],
    currentId: null,
    loading: false,
  });

  const initializePosts = (posts: Post[]) => {
    // 排序貼文，最新的在最前面
    posts.sort((a: any, b: any) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
    state.list = posts;
  };

  const toggleLike = async (postId: number, username: string) => {
    await likePost({ postId, username });
    await loadAllPosts();
  };

  const toggleFavor = async (postId: number, username: string) => {
    await favorPost({ postId, username });
    await loadAllPosts();
  };

  const setCurrentId = (id: number) => {
    state.currentId = id;
  };

  const setPostsSearchResult = (posts: Post[]) => {
    state.searchResult = posts;
  };

  const uploadPost = async ({ image, description, user_id }: Post) => {
    await createPost({ image, description, user_id });
    await loadAllPosts();
    changeShowPostUpload(false);
  };

  const loadAllPosts = async () => {
    state.loading = true;
    const posts = await loadPosts();
    initializePosts(posts);
    state.loading = false;
  };

  const searchPosts = async (term: string) => {
    let posts = await loadPosts();

    // 過濾出包含搜尋字串的貼文
    posts = posts.filter((post) => {
      return post.description.includes(term);
    });

    setPostsSearchResult(posts);
  };

  const postDetails = (): Post | undefined => {
    return state.list.find((post) => post.id === state.currentId);
  };

  const showPostDetails = (id: number) => {
    setCurrentId(id);
    loadAllComments(id);
    changeShowPostDetails(true);
  };

  const hidePostDetails = () => {
    // setCurrentId(null);
    changeShowPostDetails(false);
  };

  return {
    state,
    initializePosts,
    toggleLike,
    toggleFavor,
    setCurrentId,
    setPostsSearchResult,
    uploadPost,
    loadAllPosts,
    searchPosts,
    postDetails,
    showPostDetails,
    hidePostDetails,
  };
});

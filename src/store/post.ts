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
import { Id, Username } from "../types/form";

export const usePostStore = defineStore("post", () => {
  const { changeShowPostUpload, changeShowPostDetails } = useGeneralStore();
  const { loadAllComments } = useCommentStore();

  const state = reactive({
    list: [],
    searchResult: [],
    currentId: null,
  });

  const initializePosts = (posts: any) => {
    state.list = posts;
  };

  // 按讚貼文
  const toggleLike = async (postId: Id, username: Username) => {
    await likePost(postId, username);
    await loadAllPosts();
  };

  // 收藏貼文
  const toggleFavor = async (postId: Id, username: Username) => {
    await favorPost(postId, username);
    await loadAllPosts();
  };

  const setCurrentId = (id: any) => {
    state.currentId = id;
  };

  const setPostsSearchResult = (posts: any) => {
    state.searchResult = posts;
  };

  // 上傳貼文
  const uploadPost = async ({ image, description, user_id }: any) => {
    await createPost(image, description, user_id);
    loadAllPosts();
    // 關閉對話框並清空上傳的圖片
    changeShowPostUpload(false);
  };

  // 取得所有貼文
  const loadAllPosts = async () => {
    const posts = await loadPosts();
    initializePosts(posts);
  };

  // 搜尋貼文: 尚未完成
  const searchPosts = async (term: string) => {
    // 取得所有貼文
    const posts = await loadPosts();

    console.log("搜尋", term);
    console.log("posts", posts);
    setPostsSearchResult(posts);
  };

  // 取得貼文詳細資料
  const postDetails = () => {
    return state.list.find((post: any) => post.id === state.currentId);
  };

  const showPostDetails = (id: Id) => {
    setCurrentId(id);
    loadAllComments(id);
    changeShowPostDetails(true);
  };

  const hidePostDetails = () => {
    setCurrentId(null);
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

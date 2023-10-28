import { ref } from "vue";
import { defineStore } from "pinia";
import {
  createPost,
  loadPosts,
  likePost,
  favorPost,
} from "../services/apiPost";
import { useGeneralStore } from "./general";
import { useCommentStore } from "./comment";

export const usePostStore = defineStore("post", () => {
  const { changeShowPostUpload, changeShowPostDetails } = useGeneralStore();
  const { loadAllComments } = useCommentStore();

  const list = ref({});
  const searchResult = ref([]);
  const currentId = ref(null);

  const initializePosts = (posts) => {
    list.value = posts;
  };

  const toggleLike = async (id) => {
    console.log("Like", id);

    const isLike = await likePost(id);

    const post = list.value.find((post) => post.id === id);
    if (isLike) {
      post.liked_bies = (post.liked_bies || 0) + 1;
    } else {
      post.liked_bies--;
    }
    post.likedByMe = isLike;
  };

  const toggleFavor = async (id) => {
    console.log("Favor", id);

    const isFavor = await favorPost(id);
    const post = list.value.find((post) => post.id === id);
    if (isFavor) {
      post.favored_bies = (post.favored_bies || 0) + 1;
    } else {
      post.favored_bies--;
    }
    post.favoredByMe = isFavor;
  };

  const setCurrentId = (id) => {
    currentId.value = id;
  };

  const increaseCommentCount = (id) => {
    const post = list.value.find((post) => post.id === id);
    post.comments++;
  };

  const setPostsSearchResult = (posts) => {
    searchResult.value = posts;
  };

  // 上傳貼文
  const uploadPost = async ({ image, description, user_id }) => {
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

  // 搜尋貼文
  const searchPosts = async (term: string) => {
    const posts = await loadPosts("filters[description][$contains]=" + term);
    setPostsSearchResult(posts);
  };

  // 取得貼文詳細資料
  const postDetails = () => {
    return list.value.find((post) => post.id === currentId.value);
  };

  const showPostDetails = (id) => {
    setCurrentId(id);
    loadAllComments(id);
    changeShowPostDetails(true);
  };

  const hidePostDetails = () => {
    setCurrentId(null);
    changeShowPostDetails(false);
  };

  return {
    list,
    searchResult,
    currentId,
    initializePosts,
    toggleLike,
    toggleFavor,
    setCurrentId,
    increaseCommentCount,
    setPostsSearchResult,
    uploadPost,
    loadAllPosts,
    searchPosts,
    postDetails,
    showPostDetails,
    hidePostDetails,
  };
});

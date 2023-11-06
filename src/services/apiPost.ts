import supabase, { supabaseUrl } from "./supabase";
import { getUser } from "../utils/localStorage";

// 取得所有貼文
export async function loadPosts() {
  const [postsResponse, usersResponse] = await Promise.all([
    supabase.from("post").select("*"),
    supabase.from("user").select("id, username"),
  ]);

  if (postsResponse.error || usersResponse.error) {
    throw new Error("Error fetching data");
  }

  const posts = postsResponse.data || [];
  const users = usersResponse.data || [];

  const postsWithUsername = posts.map((post) => {
    const user = users.find((user) => user.id === post.user_id);
    return {
      ...post,
      username: user?.username,
    };
  });

  return postsWithUsername;
}

// 取得我按讚的貼文
export async function loadPostLikedByMe(username) {
  const { data: posts, error } = await supabase
    .from("post")
    .select("image, liked_list");

  if (error) {
    throw new Error("LoadPostLikedByMe has error");
  }

  const likedPosts = posts.filter((post) =>
    post.liked_list?.includes(username)
  );
  return likedPosts;
}

// 取得我收藏的貼文
export async function loadPostFavoredByMe(username) {
  const { data: posts, error } = await supabase
    .from("post")
    .select("image, favored_list");

  if (error) {
    throw new Error("LoadPostFavoredByMe has error");
  }

  const favoredPosts = posts.filter((post) =>
    post.favored_list?.includes(username)
  );
  return favoredPosts;
}

// 建立貼文
export async function createPost(image, description, user_id) {
  const imageName = `${Math.random()}-${image.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/bored-images/${imageName}`;

  const { data, error } = await supabase.from("post").insert([
    {
      image: imagePath,
      description,
      user_id,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error("CreatePost has error");
  }

  const { error: storageError } = await supabase.storage
    .from("bored-images")
    .upload(imageName, image);

  if (storageError) {
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not to created"
    );
  }

  return data;
}

// 取得我撰寫的貼文
export async function loadPostsByMe(userId) {
  console.log("userId", userId);
  const { data: posts, error } = await supabase
    .from("post")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error("LoadPostsByMe has error");
  }

  return posts;
}

// 喜歡貼文
export async function likePost(postId, username) {
  const { data: post, error } = await supabase
    .from("post")
    .select("liked_list")
    .eq("id", postId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("LikePost has error");
  }

  const likedList = post.liked_list || [];

  const updatedLikedList = likedList.includes(username)
    ? likedList.filter((name) => name !== username)
    : [...likedList, username];

  const { error: updateError } = await supabase
    .from("post")
    .update({ liked_list: updatedLikedList })
    .eq("id", postId);

  if (updateError) {
    console.error(updateError);
    throw new Error("LikePost has error");
  }

  return !likedList.includes(username);
}

// 收藏貼文
export async function favorPost(postId, username) {
  const { data: post, error } = await supabase
    .from("post")
    .select("favored_list")
    .eq("id", postId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("FavorPost has error");
  }

  const favoredList = post.favored_list || [];

  const updatedFavoredList = favoredList.includes(username)
    ? favoredList.filter((name) => name !== username)
    : [...favoredList, username];

  const { error: updateError } = await supabase
    .from("post")
    .update({ favored_list: updatedFavoredList })
    .eq("id", postId);

  if (updateError) {
    console.error(updateError);
    throw new Error("FavorPost has error");
  }

  return !favoredList.includes(username);
}

import { getJwtToken, getUser } from "./auth";
import { request } from "../utils/request";
import supabase from "./supabase";

export async function createPost(image, description) {
  const formData = new FormData();
  formData.append("files.image", image);
  formData.append("data", JSON.stringify({ description }));

  console.log(formData);
  const { data, error } = await supabase
    .from("post")
    .insert([formData])
    .select();

  console.log(data);

  return post;
}

export async function loadPosts(filters = "") {
  let { data: post, error } = await supabase.from("post").select("*");
  console.log(post);

  return post;
}

export async function loadPostsByMe() {
  return loadPosts(`filters[user][id][$eq]=${getUser().id}`);
}

export async function loadPostsLikedOrFavoredByMe(type = "likes") {
  const response = await request(
    `/api/users/me?populate[${type}][populate][0]=image`
  );
  return response[type].map((post) => ({
    ...post,
    image: post?.image?.[0].url,
  }));
}

export async function likePost(id) {
  const response = await request(`/api/posts/${id}/like`, {
    method: "PUT",
  });
  return response.data;
}

export async function favorPost(id) {
  const response = await request(`/api/posts/${id}/favor`, {
    method: "PUT",
  });
  return response.data;
}

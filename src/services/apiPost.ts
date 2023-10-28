import supabase, { supabaseUrl } from "./supabase";
import { getUser } from "../utils/localStorage";

// 建立貼文
export async function createPost(image, description, user_id) {
  const imageName = `${Math.random()}-${image.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/bored-images/${imageName}`;

  const { data, error } = await supabase
    .from("post")
    .insert([{ image: imagePath, description, user_id }]);

  if (error) {
    console.error(error);
    throw new Error("CreatePost has error");
  }

  const { error: storageError } = await supabase.storage
    .from("bored-images")
    .upload(imageName, image);

  // 3. Delete the cabin, if there's an error uploading image
  if (storageError) {
    // console.log(storageError);
    // await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not to created"
    );
  }

  return data;
}

// 取得所有貼文
export async function loadPosts(filters = "") {
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

// 取得我的貼文
export async function loadPostsByMe() {
  return loadPosts(`filters[user][id][$eq]=${getUser().id}`);
}

// 喜歡貼文
export async function likePost(id) {
  const { error } = await supabase
    .from("post")
    .update({ liked_bies: 1 })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("LikePost has error");
  }

  return true;
}

// 收藏貼文
export async function favorPost(id) {
  const { error } = await supabase
    .from("post")
    .update({ favored_bies: 1 })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("FavorPost has error");
  }

  return true;
}

export async function loadPostsLikedOrFavoredByMe(type = "likes") {
  // const response = await request(
  //   `/api/users/me?populate[${type}][populate][0]=image`
  // );
  // return response[type].map((post) => ({
  //   ...post,
  //   image: post?.image?.[0].url,
  // }));
}

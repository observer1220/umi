import supabase from "./supabase";
import { Comment } from "../types/comment";

export async function createComment({ content, postId, userId }: Comment) {
  const { data } = await supabase
    .from("comment")
    .insert([
      {
        content,
        post_id: postId,
        user_id: userId,
      },
    ])
    .select();

  console.log(data);
}

export async function loadComments(postId: number) {
  try {
    const [commentsResponse, usersResponse] = await Promise.all([
      supabase.from("comment").select("*").eq("post_id", postId),
      supabase.from("user").select("username, id"),
    ]);

    if (commentsResponse.error) {
      throw new Error(commentsResponse.error.message);
    }

    if (usersResponse.error) {
      throw new Error(usersResponse.error.message);
    }

    const comments = commentsResponse.data.map((comment) => {
      const userItem = usersResponse.data.find(
        (user) => user.id === comment.user_id
      );
      return {
        ...comment,
        username: userItem?.username,
      };
    });

    return comments;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

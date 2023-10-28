import supabase from "./supabase";

export async function createComment(content, postId) {
  console.log(content, postId);

  const { data, error } = await supabase
    .from("comment")
    .insert([
      {
        content,
        post_id: postId,
      },
    ])
    .select();
}

export async function loadComments(postId) {
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
        username: userItem.username,
      };
    });

    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
}

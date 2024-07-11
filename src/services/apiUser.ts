import supabase from "./supabase";
import { CreateUser, User } from "../types/user";
// import { getUser, saveUser } from "../utils/localStorage";

// 取得登入使用者
// export async function loadUser() {
//   const user = getUser();
//   if (user) {
//     return user;
//   }

//   console.log(supabase);
//   const { data, error } = await supabase.auth.api.getUser();
//   console.log(data);

//   if (error) {
//     throw new Error(error.message);
//   }

//   saveUser(data);
//   return data;
// }

// 新增使用者
export async function createUser({ email, username, auth_id }: CreateUser) {
  const { data, error } = await supabase
    .from("user")
    .insert([{ email, username, auth_id }]);

  if (error) {
    console.error(error);
    throw new Error("CreateUser has error");
  }

  return data;
}

// 編輯使用者
export async function changeUser(user: User) {
  console.log("user", user);

  const { data, error } = await supabase
    .from("user")
    .update({
      username: user.username,
      brief: user.brief,
      mobile: user.mobile,
      gender: user.gender,
      avatar: user.avatar,
    })
    .eq("auth_id", user.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("ChangeUser has error");
  }

  return data;
}

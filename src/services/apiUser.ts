import supabase from "./supabase";
import { getUser, saveUser } from "../utils/localStorage";

// 取得登入使用者
export async function loadUser() {
  const user = getUser();
  if (user) {
    return user;
  }

  const { data, error } = await supabase.auth.api.getUser();

  if (error) {
    throw new Error(error.message);
  }

  saveUser(data);
  return data;
}

// 新增使用者
export async function createUser(email, username, auth_id) {
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
export async function changeUser(user) {
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

import supabase from "./supabase";
import { createUser } from "./apiUser";
import { saveUser, setJwtToken } from "../utils/localStorage";

// 註冊功能 OK
export async function register(email, fullName, password) {
  try {
    if (password.length < 6) {
      alert("密碼長度至少六位元");
    }

    // 註冊成功後，會自動登入
    let { data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          avatar: "",
        },
      },
    });

    if (data) createUser(email, fullName, data.user.id);
    setJwtToken(data.session);
    saveUser(data.user);
    return data.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

// 登入功能 OK
export async function login(email, password) {
  try {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { data: user, error: userError } = await supabase
      .from("user")
      .select("username, id")
      .eq("role", data.user.id);
    data.user.user_metadata.fullName = user[0].username;
    data.user.user_metadata.userId = user[0].id;

    if (userError) {
      throw new Error(userError.message);
    }

    if (authError) {
      throw new Error(authError.message);
    }

    setJwtToken(data.session.access_token);
    saveUser(data.user);

    return data.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

// 登出功能 OK
export function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}

import supabase from "./supabase";
import { createUser } from "./apiUser";
import { saveUser, setJwtToken } from "../utils/localStorage";

// 註冊功能 OK
export async function register(email, username, password) {
  try {
    let { data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          avatar: "",
        },
      },
    });

    if (data) createUser(email, username, data.user.id);
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
      .select("*")
      .eq("auth_id", data.user.id);

    data.user.user_metadata = {
      username: user[0].username,
      userId: user[0].id,
      gender: user[0].gender,
      mobile: user[0].mobile,
      brief: user[0].brief,
    };

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

import supabase from "./supabase";
import { createUser } from "./apiUser";
import { saveUser, setJwtToken } from "../utils/localStorage";

interface SignUpResponse {
  data: {
    user: any;
    session: any;
  };
  error: any;
}

// 註冊功能 OK
export async function register(email: any, username: any, password: any) {
  try {
    let { data }: SignUpResponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          avatar: "",
        },
      },
    });

    createUser(email, username, data.user.id);
    setJwtToken(data.session);
    saveUser(data.user);
    return data.user;
    
  } catch (error) {
    const typedError = error as Error;
    throw new Error(typedError.message);
  }
}

// 登入功能 OK
export async function login(email: any, password: any) {
  try {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { data: user, error: userError } = await supabase
      .from("user")
      .select("*")
      .eq("auth_id", data.user?.id);

    if (user && data.user) {
      data.user.user_metadata = {
        username: user[0].username,
        userId: user[0].id,
        gender: user[0].gender,
        mobile: user[0].mobile,
        brief: user[0].brief,
      };
    }

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
    const typedError = error as Error;
    throw new Error(typedError.message);
  }
}

// 登出功能 OK
export function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}

import supabase from "./supabase";

export function getJwtToken() {
  return localStorage.getItem("jwtToken");
}

export function setJwtToken(jwt) {
  localStorage.setItem("jwtToken", jwt);
}

export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export async function register(email, fullName, password) {
  try {
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
    // console.log(data);
    setJwtToken(data.session);
    saveUser(data.user);
    return data.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function login(email, password) {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setJwtToken(data.session.access_token);
    saveUser(data.user);
    return data.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}

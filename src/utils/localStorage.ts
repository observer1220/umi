// import { User } from "../types/user";

export function getUser() {
  const userString = localStorage.getItem("user");
  if (userString !== null) {
    return JSON.parse(userString);
  }
  return null;
}

export function getJwtToken() {
  return localStorage.getItem("jwtToken");
}

export function setJwtToken(jwt: string) {
  localStorage.setItem("jwtToken", jwt);
}

export function saveUser(user: any) {
  console.log('存什麼', user);
  localStorage.setItem("user", JSON.stringify(user));
}

export function updateLocalUser(user: string) {
  const localStorageUser = getUser();
  localStorageUser.user_metadata = user;
  saveUser(localStorageUser);
}

import { ref } from "vue";
import { defineStore } from "pinia";
import { changeUser } from "../services/apiUser";
import { login, logout, register } from "../services/apiAuth";
import { getUser, updateLocalUser } from "../utils/localStorage";
import { RegisterParams, LoginParams } from "../types/auth";

export const useUserStore = defineStore("user", () => {
  const user = ref(getUser() || {});  

  const setUser = (user: any) => {
    user.value = user;
  };

  const registerUser = async ({ email, username, password}: RegisterParams) => {
    const user = await register({ email, username, password });
    setUser(user);
  };

  const loginUser = async ({ email, password }: LoginParams) => {
    try {
      const user = await login({ email, password });
      setUser(user);
      return "success";
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (user: any) => {
    const updatedUser = await changeUser(user);
    updateLocalUser(updatedUser[0]);
  };

  const logoutUser = () => {
    logout();
    setUser({});
  };

  return {
    user,
    setUser,
    registerUser,
    loginUser,
    updateUser,
    logoutUser,
  };
});

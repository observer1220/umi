import { ref } from "vue";
import { defineStore } from "pinia";
import { changeUser } from "../services/apiUser";
import { login, logout, register } from "../services/apiAuth";
import { getUser, updateLocalUser } from "../utils/localStorage";

export const useUserStore = defineStore("user", () => {
  const user = ref(getUser() || {});

  const setUser = (user: any) => {
    user.value = user;
  };

  const registerUser = async (email: any, username: any, password: any) => {
    const user = await register(email, username, password);
    setUser(user);
  };

  const loginUser = async (email: any, password: any) => {
    console.log(email, password);

    try {
      const user = await login(email, password);
      setUser(user);
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

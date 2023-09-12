import HomePage from "./pages/HomePage.vue";
import SearchPage from "./pages/SearchPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import ProfileEdittingPage from "./pages/ProfileEdittingPage.vue";
import LoginPage from "./pages/LoginPage.vue";

import { createRouter, createWebHistory } from "vue-router";
import { getJwtToken } from "./apis/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/search_result",
    name: "search_result",
    component: SearchPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
  },
  {
    path: "/profile/edit",
    name: "profileEdit",
    component: ProfileEdittingPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to) => {
  // 如果名稱不是login，且沒有jwtToken，就導到login
  if (to.name !== "login" && !getJwtToken()) {
    return { name: "login" };
  }

  // 如果名稱是login，且有jwtToken，就導到home
  if (to.name === "login" && getJwtToken()) {
    return { name: "home" };
  }
});

export { router };

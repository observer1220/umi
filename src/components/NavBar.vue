<template>
  <nav class="navbar">
    <!-- LOGO -->
    <router-link to="/"><img src="../assets/logo.svg" /></router-link>
    <!-- 搜尋框 -->
    <div class="searchInput">
      <input 
        type="text" 
        @change="searchPosts" 
        placeholder="搜尋"
      />
      <TheIcon icon="search" />
    </div>
    <!-- 右側欄位 -->
    <div class="navItems">
      <router-link to="/"><TheIcon icon="home" /></router-link>
      <button @click="publishPost()">
        <TheIcon icon="publish" />
      </button>
      <!-- 下拉選單 -->
      <div class="profileDropDown">
        <TheAvatar
          :width="42"
          :height="42"
          style="cursor: pointer"
          @click="showDropdown = !showDropdown"
          :src="user.avatar"
        />
        <!-- :src="user.avatar" -->
        <div
          class="dropdownMenu"
          v-show="showDropdown"
          @click="showDropdown = false"
        >
          <ul class="profileMenu">
            <li><router-link to="/profile">個人主頁</router-link></li>
            <li @click="logout">退出登入</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import TheIcon from "./TheIcon.vue";
import TheAvatar from "./TheAvatar.vue";
import { useRouter } from "vue-router";
import { useGeneralStore } from '../store/general'
import { usePostStore } from '../store/post'
import { useUserStore } from '../store/user'

const router = useRouter();
const generalStore = useGeneralStore();
const postStore = usePostStore();
const userStore = useUserStore();

const showDropdown = ref(false);
const user = computed(() => userStore.user);

function publishPost() {
  generalStore.changeShowPostUpload(true);
}

async function searchPosts(e) {
  await postStore.searchPosts(e.target.value);
  router.push({
    name: "search_result",
    params: {
      term: e.target.value,
    },
  });
}

async function logout() {
  await userStore.logoutUser();
  router.push("/login");
}
</script>

<style scoped>
.navbar {
  width: 80vw;
  height: 80px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}
.navbar svg {
  width: 38px;
  height: 38px;
}

.searchInput {
  position: relative;
}

.searchInput input {
  width: 100%;
  padding: 12px;
  padding-left: 36px;

  background: #f1f1f1;
  border-radius: 14px;
  border: none;
}

.searchInput > svg {
  position: absolute;
  left: 0;
  top: 11px;
  left: 12px;
}

.navItems {
  justify-self: end;
  display: flex;
  gap: 24px;
  align-items: center;
}

.navItems > button {
  border: none;
  background: none;
}

.profileDropDown {
  position: relative;
}

.profileMenu {
  position: absolute;
  width: max-content;
  padding: 24px 26px;
  list-style: none;
  background: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  right: 0;
  display: grid;
  row-gap: 18px;
  transform: translateY(18px);
}

.profileMenu::before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  top: -12px;
  right: 10px;
  border-bottom: 12px solid white;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}

.profileMenu a,
.profileMenu li {
  text-decoration: none;
  cursor: pointer;
}

.profileMenu a:visited {
  color: initial;
}
</style>

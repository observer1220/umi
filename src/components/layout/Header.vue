<template>
  <header class="header">
    <nav class="navbar">
      <!-- LOGO -->
      <router-link to="/">
        <!-- <img src="../../assets/logo.svg" /> -->
        阿瀚的梗圖倉庫
      </router-link>
      <!-- 搜尋框 -->
      <div class="searchInput">
        <input type="text" @change="searchPosts" placeholder="搜尋" />
        <TheIcon icon="search" />
      </div>
      <!-- 右側欄位 -->
      <div class="navItems">
        <router-link to="/">
          <TheIcon icon="home" />
        </router-link>
        <button @click="publishPost()">
          <TheIcon icon="publish" />
        </button>
        <!-- 下拉選單 -->
        <div class="profileDropDown">
          <TheAvatar :width="42" :height="42" style="cursor: pointer" @click="showDropdown = !showDropdown"
            :src="user.avatar" />
          <ul v-show="showDropdown" @click="showDropdown = false" class="profileMenu">
            <li><router-link to="/profile">個人檔案</router-link></li>
            <li @click="logout">登出</li>
          </ul>
        </div>
        <!-- Dark Mode -->
        <button :class="generalStore.backgroundMode == 'sun' ? 'sunMode' : 'backgroundMode'"
          @click="generalStore.toggleBackgroundMode()">
          <el-icon v-if="generalStore.backgroundMode == 'sun'" size="36">
            <Sunrise />
          </el-icon>
          <el-icon v-else size="36">
            <Moon />
          </el-icon>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import TheIcon from "../TheIcon.vue";
import TheAvatar from "../TheAvatar.vue";
import { useRouter } from "vue-router";
import { useGeneralStore } from '../../store/general'
import { usePostStore } from '../../store/post'
import { useUserStore } from '../../store/user'

const router = useRouter();
const generalStore = useGeneralStore();
const postStore = usePostStore();
const userStore = useUserStore();

const showDropdown = ref(false);
const user = computed(() => userStore.user);

function publishPost() {
  generalStore.changeShowPostUpload(true);
}

async function searchPosts(event: any) {
  await postStore.searchPosts(event.target.value);
  router.push({
    name: "search_result",
    params: {
      term: event.target.value,
    },
  });
}

function logout() {
  userStore.logoutUser();
  router.push("/login");
}
</script>

<style scoped>
.header {
  height: 80px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}

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

.navbar a {
  color: inherit;
  text-decoration: none;
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

.searchInput>svg {
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

.navItems>button {
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
  color: inherit;
}

.sunMode svg {
  color: #f1440f;
}


.backgroundMode svg {
  color: #f1c40f;
}
</style>

<template>
  <footer class="footer">
    <div class="navItems">
      <button @click="pageAction.reloadPage">
        <img :src="homeIcon" alt="homeIcon" style="width: 30px" />
      </button>
      <button @click="pageAction.goToSearchPage">
        <img :src="searchIcon" alt="searchIcon" style="width: 30px" />
      </button>
      <button @click="pageAction.publishPost">
        <img :src="postIcon" alt="postIcon" style="width: 30px" />
      </button>
      <button @click="pageAction.goToProfile">
        <img :src="userIcon" alt="userIcon" style="width: 30px" />
      </button>
      <!-- Dark Mode -->
      <button :class="generalStore.backgroundMode == 'sun' ? 'sunMode' : 'backgroundMode'
        " @click="generalStore.toggleBackgroundMode()">
        <el-icon v-if="generalStore.backgroundMode == 'sun'" size="36">
          <Sunrise />
        </el-icon>
        <el-icon v-else size="36">
          <Moon />
        </el-icon>
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useGeneralStore } from "../../store/general";
import { useUserStore } from "../../store/user";
import { useRouter } from "vue-router";
import postIcon from "../../assets/postIcon.png";
import searchIcon from "../../assets/searchIcon.png";
import homeIcon from "../../assets/homeIcon.png";
import userIcon from "../../assets/userIcon.png";

const generalStore = useGeneralStore();
const userStore = useUserStore();
const router = useRouter();

const pageAction = reactive({
  reloadPage() {
    router.push({ name: "home" })
  },
  publishPost() {
    generalStore.changeShowPostUpload(true);
  },
  goToSearchPage() {
    router.push({ name: "search" });
  },
  goToProfile() {
    router.push({ name: "profile" });
  },
  logout() {
    userStore.logoutUser();
    router.push("/login");
  },
});
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  z-index: 100;
}

.navItems {
  display: flex;
  justify-content: space-around;
}

.navItems>button {
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
}

.sunMode svg {
  color: #f1440f;
}

.backgroundMode svg {
  color: #f1c40f;
}
</style>

<template>
  <footer class="footer">
    <div class="navItems">
      <button @click="pageAction.reloadPage">
        <img :src="homeIcon" alt="" style="width: 30px" />
      </button>
      <button @click="pageAction.goToSearchPage">
        <img :src="searchIcon" alt="" style="width: 30px" />
      </button>
      <button @click="pageAction.publishPost">
        <img :src="postIcon" alt="" style="width: 30px" />
      </button>
      <!-- Dark Mode -->
      <button
        :class="
          generalStore.backgroundMode == 'sun' ? 'sunMode' : 'backgroundMode'
        "
        @click="generalStore.toggleBackgroundMode()"
      >
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
import { reactive, computed } from "vue";
import { useGeneralStore } from "../../store/general";
import { useUserStore } from "../../store/user";
import { useRouter } from "vue-router";
import postIcon from "../../assets/postIcon.png";
import searchIcon from "../../assets/searchIcon.png";
import homeIcon from "../../assets/homeIcon.png";

const generalStore = useGeneralStore();
const userStore = useUserStore();
const router = useRouter();

const pageAction = reactive({
  reloadPage() {
    location.reload();
  },
  publishPost() {
    generalStore.changeShowPostUpload(true);
  },
  async goToSearchPage() {
    router.push({ name: "search" });
  },
  logout() {
    userStore.logoutUser();
    router.push("/login");
  },
});
</script>

<style scoped>
.footer {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
}

.navItems {
  display: flex;
  justify-content: space-around;
}

.navItems > button {
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
  z-index: 9999;
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

.profileMenuLight {
  background: white;
  color: black;
}

.profileMenuDark {
  background: #333;
  color: white;
}
</style>

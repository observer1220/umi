<template>
  <footer class="footer">
    <div class="navItems">
      <button @click="pageAction.reloadPage">
        <HomeIcon style="width: 36px" />
      </button>
      <button @click="pageAction.goToSearchPage">
        <MagnifyingGlassIcon style="width: 36px" />
      </button>
      <button @click="pageAction.publishPost">
        <PlusCircleIcon style="width: 36px" />
      </button>
      <button @click="pageAction.goToProfile">
        <UserIcon style="width: 36px" />
      </button>
      <!-- Dark Mode -->
      <button :class="generalStore.backgroundMode == 'sun' ? 'sunMode' : 'backgroundMode'
        " @click="generalStore.toggleBackgroundMode()">
        <SunIcon v-if="generalStore.backgroundMode == 'sun'" style="width: 36px" />
        <MoonIcon v-else style="width: 36px" />
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useGeneralStore } from "../../store/general";
import { useUserStore } from "../../store/user";
import { useRouter } from "vue-router";
import { HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, UserIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline';

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
  backdrop-filter: blur(5px);
  z-index: 100;
  /* background-color: #a6e1fa; */
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

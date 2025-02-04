<template>
  <header class="header">
    <nav class="navbar">
      <!-- LOGO -->
      <router-link to="/umi">
        <img src="../../assets/wave.png" style="height: 30px" />
      </router-link>
      <div class="brandName">
        <h1><i>UMI</i></h1>
      </div>
      <!-- 右側欄位 -->
      <div class="navItems">
        <button @click="pageAction.logout">
          <img :src="logoutIcon" alt="" style="width: 30px" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user";
import logoutIcon from "../../assets/logoutIcon.png";

const router = useRouter();
const userStore = useUserStore();

const pageAction = reactive({
  logout() {
    userStore.logoutUser();
    router.push("/login");
  },
});
</script>

<style scoped>
.header {
  height: 60px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  height: 60px;
  margin: 0 auto;
}

.navbar svg {
  width: 38px;
  height: 38px;
}

.navbar a {
  color: inherit;
  text-decoration: none;
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

.brandName {
  user-select: none;
}
</style>

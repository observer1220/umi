<template>
  <header class="header">
    <nav class="navbar">
      <!-- LOGO -->
      <router-link to="/umi">
        <img src="../../assets/wave.png" style="height: 30px;" />
      </router-link>
      <!-- 右側欄位 -->
      <div class="navItems">
        <!-- 下拉選單 -->
        <div class="profileDropDown">
          <TheAvatar :width="42" :height="42" style="cursor: pointer" @click="state.showDropdown = !state.showDropdown"
            :src="state.user.avatar" />
          <ul v-show="state.showDropdown" @click="state.showDropdown = false" 
            class="profileMenu"
            :class="generalStore.backgroundMode == 'sun' ? 'profileMenuLight' : 'profileMenuDark'"
          >
            <li><router-link to="/profile">個人檔案</router-link></li>
            <!-- <li><router-link to="/exchangeRate">匯率計算</router-link></li> -->
            <li @click="pageAction.logout">登出</li>
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
import { reactive, computed } from "vue";
import TheAvatar from "../TheAvatar.vue";
import { useRouter } from "vue-router";
import { useGeneralStore } from '../../store/general'
import { useUserStore } from '../../store/user'

const router = useRouter();
const generalStore = useGeneralStore();
const userStore = useUserStore();

const state = reactive({
  showDropdown: false,
  user: computed(() => userStore.user)
});

const pageAction = reactive({
  logout() {
    userStore.logoutUser();
    router.push("/login");
  },
})
</script>

<style scoped>
.header {
  height: 80px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  height: 80px;
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

.profileMenuLight {
  background: white;
  color: black;
}

.profileMenuDark {
  background: #333;
  color: white;
}

.sunMode svg {
  color: #f1440f;
}


.backgroundMode svg {
  color: #f1c40f;
}
</style>

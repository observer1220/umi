<template>
  <footer class="footer">
    <div class="navItems">
      <button @click="pageAction.goToSearchPage">
        <img :src="searchIcon" alt="" style="width: 30px;">
      </button>
      <button @click="pageAction.publishPost">
        <img :src="postIcon" alt="" style="width: 30px;">
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useGeneralStore } from "../../store/general";
import { useRouter } from "vue-router";
import postIcon from "../../assets/postIcon.png";
import searchIcon from "../../assets/searchIcon.png";

const generalStore = useGeneralStore();
const router = useRouter();

const pageAction = reactive({
  publishPost() {
    generalStore.changeShowPostUpload(true);
  },
  async goToSearchPage() {
    router.push({name: "search"});
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
  justify-content: center;
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center; */
}

.navItems > button {
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
}
</style>

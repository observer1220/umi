<template>
  <footer class="footer">
    <div class="navItems">
      <!-- <div class="searchInput">
        <input
          type="text"
          @change="pageAction.searchPosts"
          placeholder="搜尋"
        />
        <TheIcon icon="search" />
      </div> -->
      <el-button @click="pageAction.publishPost">
        <img :src="postIcon" alt="" style="width: 30px;">
      </el-button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useGeneralStore } from "../../store/general";
import { usePostStore } from "../../store/post";
import { useRouter } from "vue-router";
import postIcon from "../../assets/postIcon.png";
// import TheIcon from "../TheIcon.vue";

const generalStore = useGeneralStore();
const postStore = usePostStore();
const router = useRouter();

const pageAction = reactive({
  publishPost() {
    generalStore.changeShowPostUpload(true);
  },
  async searchPosts(event: Event) {
    const target = event.target as HTMLInputElement;
    await postStore.searchPosts(target.value);
    router.push({
      name: "search_result",
      params: {
        term: target.value,
      },
    });
  },
});
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: black;
  text-align: center;
}

.navItems {
  /* display: flex;
  justify-content: center; */
  /* align-items: center; */
}

.navItems > button {
  width: 50px;
  height: 50px;
}

.searchInput {
  position: relative;
}

.searchInput > input {
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
</style>

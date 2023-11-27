<template>
  <el-dialog v-model="useGeneral.showPostUpload" width="30%" top="5vh">
    <template #header>
      建立新貼文
    </template>
    <div class="container">
      <img v-if="imageObjUrl" :src="imageObjUrl" class="preview" />
      <input v-else type="file" accept="image/*" @change="handleImageUpload" />
      <div class="postContent">
        <textarea class="postContentInput" v-model="description" placeholder="有什麼新鮮事?" rows="3" />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useGeneral.changeShowPostUpload(false)">取消</el-button>
        <el-button type="primary" @click="publishPost">
          發佈
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePostStore } from "../store/post";
import { useGeneralStore } from "../store/general";
import { useUserStore } from "../store/user";

const usePost = usePostStore();
const useUser = useUserStore();
const useGeneral = useGeneralStore();

const imageObjUrl = ref("");
const image = ref(null);
const description = ref("");

async function handleImageUpload(event: any) {
  // 暫時只允許上傳一張圖片
  const imageFile = event.target.files[0];
  if (imageFile) {
    // 設置預覽
    imageObjUrl.value = URL.createObjectURL(imageFile);
    // 設置圖片文件
    image.value = imageFile;
  }
}

function publishPost() {
  usePost.uploadPost({
    image: image.value,
    description: description.value,
    user_id: useUser.user.user_metadata.userId,
  });
}
</script>

<style scoped>
.preview {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.postContent {
  margin-top: 10px;
  display: grid;
}

.postContentInput {
  resize: none;
}
</style>

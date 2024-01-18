<template>
  <el-dialog v-model="useGeneral.showPostUpload" width="30%" top="5vh">
    <template #header>
      建立新貼文
    </template>
    <div class="container">
      <div class="postContent">
        <el-input v-model="state.description" type="textarea" class="postContentInput" placeholder="有什麼新鮮事?" autosize />
        <span v-if="state.description.length === state.contentLimit" class="contentLimit">Can't excess {{
          state.contentLimit }} words</span>
      </div>
      <img v-if="state.imageObjUrl" :src="state.imageObjUrl" class="preview" />
      <input v-else type="file" accept="image/*" @change="pageAction.handleImageUpload" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useGeneral.changeShowPostUpload(false)">取消</el-button>
        <el-button type="primary" @click="pageAction.publishPost">
          發佈
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { usePostStore } from "../store/post";
import { useGeneralStore } from "../store/general";
import { useUserStore } from "../store/user";

const usePost = usePostStore();
const useUser = useUserStore();
const useGeneral = useGeneralStore();

const state = reactive({
  description: "",
  imageObjUrl: "",
  image: null,
  contentLimit: 280,
});

const pageAction = reactive({
  handleImageUpload(event: any) {
    // 暫時只允許上傳一張圖片
    const imageFile = event.target.files[0];
    if (imageFile) {
      // 設置預覽
      state.imageObjUrl = URL.createObjectURL(imageFile);
      // 設置圖片文件
      state.image = imageFile;
    }
  },
  // 發布貼文
  publishPost() {
    usePost.uploadPost({
      image: state.image,
      description: state.description,
      user_id: useUser.user.user_metadata.userId,
    });
  },
})

// 監聽貼文內容，超過140字則截斷
watch(() => state.description, (newVal) => {
  if (newVal.length > state.contentLimit) {
    state.description = newVal.slice(0, state.contentLimit);
  }
})
</script>

<style scoped>
.preview {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.postContent {
  margin-bottom: 10px;
}

.postContentInput {
  resize: none;
}

.contentLimit {
  color: red;
  font-size: 12px;
  margin: 10px;
}
</style>

<template>
  <el-dialog v-model="useGeneral.showPostUpload" width="80%">
    <template #header>建立新貼文</template>
    <div class="container">
      <div class="postContent">
        <el-input v-model="state.description" type="textarea" class="postContentInput" placeholder="請輸入貼文內容..."
          :autosize="{ minRows: 5 }" show-word-limit maxlength="140" />
        <span v-if="state.description.length === state.contentLimit" class="contentLimit">Can't excess {{
          state.contentLimit }} words</span>
      </div>
      <img v-if="state.imageObjUrl" :src="state.imageObjUrl" class="preview" loading="lazy" />
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
import { getUser } from "../utils/localStorage";
import { ElNotification } from "element-plus";

const usePost = usePostStore();
const useGeneral = useGeneralStore();
const user = getUser();

interface State {
  description: string;
  imageObjUrl: string;
  image: File | null;
  contentLimit: number;
}

interface PageAction {
  handleImageUpload(event: Event): void;
  publishPost(): void;
  textToHTML(text: string): string;
}

const state = reactive<State>({
  description: "",
  imageObjUrl: "",
  image: null,
  contentLimit: 280,
});

const pageAction = reactive<PageAction>({
  handleImageUpload(event: Event) {
    // 暫時只允許上傳一張圖片
    const target = event.target as HTMLInputElement;
    const imageFile = target.files ? target.files[0] : null;

    // 限制圖片大小不超過1MB
    if (imageFile && imageFile.size > 1048576) {
      ElNotification({
        title: "Error",
        message: "圖片大小不可超過1MB",
        type: "error",
      });
      return;
    }

    if (imageFile) {
      // 設置預覽
      state.imageObjUrl = URL.createObjectURL(imageFile);
      // 設置圖片文件
      state.image = imageFile;
    }
  },
  textToHTML(text: string) {
    return text.replace(/\n/g, "<br>");
  },
  // 發布貼文
  publishPost() {
    if (!state.image) {
      ElNotification({
        title: "Error",
        message: "請上傳圖片",
        type: "error",
      });
    }

    if (!state.description) {
      ElNotification({
        title: "Error",
        message: "貼文內容不可為空",
        type: "error",
      });
    }

    if (state.image && state.description) {
      usePost.uploadPost({
        image: state.image,
        description: pageAction.textToHTML(state.description),
        user_id: user.user_metadata.userId,
      });
    }
  },
});

// 監聽貼文內容，超過140字則截斷
watch(
  () => state.description,
  (newVal) => {
    if (newVal.length > state.contentLimit) {
      state.description = newVal.slice(0, state.contentLimit);
    }
  }
);
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

<template>
  <TheModal @close="store.changeShowPostUpload(false)">
    <div class="postUpload">
      <label class="upload">
        <img v-if="imageObjUrl" :src="imageObjUrl" class="preview" />
        <div class="readyUpload" v-else>
          <img src="../assets/upload.png" />
          <input type="file" accept="image/*" class="fileChooser" @change="handleImageUpload" />
          <div class="uploadText">點擊上傳圖片</div>
        </div>
      </label>
      <div class="postContent">
        <textarea placeholder="請留下您的評論..." class="postContentInput" v-model="description"></textarea>
        <TheButton class="pubBtn" @click="publishPost">
          發佈
        </TheButton>
      </div>
    </div>
  </TheModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheModal from "./TheModal.vue";
import TheButton from "./TheButton.vue";
import { usePostStore } from "../store/post";
import { useGeneralStore } from "../store/general";
import { useUserStore } from "../store/user";

const usePost = usePostStore();
const useUser = useUserStore();
const store = useGeneralStore();

const imageObjUrl = ref("");
const image = ref(null);
const description = ref("");

async function handleImageUpload(event) {
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
.postUpload {
  width: 50vw;
  height: 70vh;
  display: grid;
  grid-template-rows: 4fr 1fr;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  min-height: 0;
}

.upload {
  display: grid;
  place-items: center;
  cursor: pointer;
  min-height: 0;
}

.upload>svg {
  width: 254px;
  height: 316px;
}

.readyUpload {
  width: 70%;
  height: 70%;
  border: 3px dashed #8c939d;
  border-radius: 8px;
  display: grid;
  place-items: center;
}

.readyUpload>img {
  width: 100px;
  height: 100px;
}

.fileChooser {
  opacity: 0;
  position: absolute;
}

.postContent {
  display: grid;
}

.postContentInput {
  border-bottom: none;
  resize: none;
  padding: 12px 24px;
}

.postContentInput::placeholder {
  color: #757575;
}

.pubBtn {
  align-self: end;
  justify-self: end;
  position: relative;
  right: 24px;
  bottom: 18px;
}
</style>

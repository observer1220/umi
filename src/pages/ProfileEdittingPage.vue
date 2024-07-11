<template>
  <div>
    <h2 class="title">編輯個人資料</h2>
    <div class="changeAvatar">
      <TheAvatar :width="48" :height="48" :src="profileData.avatar" />
      <TheButton>上傳頭像</TheButton>
      <input type="file" class="inputFile" @change="pageAction.uploadAvatar" />
    </div>
    <form class="profileForm" @submit.prevent="pageAction.updateUser">
      <label for="username">用戶名稱：</label>
      <input type="text" v-model="profileData.username" />
      <label for="brief">簡介：</label>
      <textarea rows="6" v-model="profileData.brief"></textarea>
      <label for="mobile">手機號碼：</label>
      <input type="text" v-model="profileData.mobile" />
      <label>性別：</label>
      <div class="genderRadios">
        <input type="radio" name="gender" :id="Gender.Male" :value="Gender.Male" v-model="profileData.gender" />
        {{ Gender.Male }}
        <input type="radio" name="gender" :id="Gender.Female" :value="Gender.Female" v-model="profileData.gender" />
        {{ Gender.Female }}
      </div>
      <div class="actions">
        <TheButton type="submit">
          儲存
        </TheButton>
        <TheButton type="reset" reverse @click.prevent="router.push('/profile')">
          取消
        </TheButton>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import TheButton from "../components/TheButton.vue";
import TheAvatar from "../components/TheAvatar.vue";
import { computed, reactive } from "vue";
import { uploadFile } from "../services/apiFile";
import { useUserStore } from '../store/user'
import { useRouter } from "vue-router";
import { Gender } from "../enum/enum"

const router = useRouter();
const userStore = useUserStore();

const state = reactive({
  user: computed(() => userStore.user),
})

const profileData = reactive({
  id: state.user.id,
  avatar: state.user.user_metadata.avatar,
  username: state.user.user_metadata.username,
  brief: state.user.user_metadata.brief,
  mobile: state.user.user_metadata.mobile,
  gender: state.user.user_metadata.gender,
});

const pageAction = reactive({
  // 上傳頭像
  async uploadAvatar(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    
    if (file) {
      const url = await uploadFile(file);
      profileData.avatar = url;
    }
  },
  // 更新使用者資料
  async updateUser() {
    await userStore.updateUser(profileData);
    window.location.reload();
  }
})
</script>

<style scoped>
.title {
  margin-bottom: 42px;
  font-size: 24px;
  font-weight: 600;
}

.changeAvatar {
  display: flex;
  align-items: center;
  position: relative;
}

.changeAvatar .button {
  margin-left: 26px;
}

.inputFile {
  opacity: 0;
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
}

.profileForm {
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 32px;
  column-gap: 10px;
  margin-top: 38px;
}

.profileForm>label {
  grid-column: 1 / 2;
  justify-self: end;
  position: relative;
  top: 6px;
}

.profileForm .actions {
  grid-column: 1 / 3;
  justify-self: end;
  display: flex;
  gap: 16px;
}
</style>
../services/file../services/apiFile
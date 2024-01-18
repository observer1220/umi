<template>
  <div class="loginPage">
    <img src="../assets/phone.png" alt="" class="phoneImage" />
    <div class="loginForm">
      <img src="../assets/logo.svg" alt="" />
      <el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" :size="state.formSize" @submit.prevent>
        <el-form-item prop="email">
          <el-input v-model="state.ruleForm.email" placeholder="EMAIL" size="large" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="state.ruleForm.password" placeholder="密碼(英文、數字8~20位元)" type="password" autocomplete="off"
            size="large" />
        </el-form-item>
        <el-form-item prop="username" v-if="!state.isLogin">
          <el-input v-model="state.ruleForm.username" placeholder="用戶名稱" size="large" />
        </el-form-item>
        <div v-if="!state.isLogin" class="agreement">
          <el-checkbox v-model="state.agreementChecked" label="勾選表示同意隱私協議和使用規範" size="large" border />
        </div>
        <button type="submit" class="loginButton"
          @click="state.isLogin ? pageAction.login(ruleFormRef) : pageAction.register(ruleFormRef)">
          {{ state.isLogin ? "登入" : "註冊" }}
        </button>
        <p @click="state.isLogin = !state.isLogin" class="info">
          {{
            state.isLogin ? "還沒有帳號？點擊註冊" : "已有帳號？點擊登入"
          }}
        </p>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import type { FormInstance, FormRules } from 'element-plus'
import type { RuleForm } from '../types/form'

const router = useRouter();
const useUser = useUserStore();

const ruleFormRef = ref<FormInstance>()
const state = reactive({
  formSize: 'default',
  isLogin: true,
  agreementChecked: false,
  ruleForm: {
    email: '',
    password: '',
    username: '',
  },
})

const pageAction = {
  validatePass(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error(`${rule.field} cannot be empty`))
    } else {
      if (!/^(?=.*[a-z])(?=.*\d)[^]{8,20}$/.test(value)) {
        callback(new Error('需包含英文與數字，長度介於8~20位元'))
      } else {
        callback()
      }
    }
  },
  async login(formEl: FormInstance | undefined) {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const loginResult = await useUser.loginUser(
          state.ruleForm.email,
          state.ruleForm.password
        );

        if (loginResult === 'success') {
          await router.replace("/");
        } else {
          alert('登入失敗');
        }
      } else {
        console.log('登入失敗', fields)
      }
    })
  },
  async register(formEl: FormInstance | undefined) {
    if (!state.agreementChecked) {
      alert("請先閱讀並同意隱私協議和使用規範");
      return;
    }

    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('註冊成功', state.ruleForm);
        await useUser.registerUser(
          state.ruleForm.email,
          state.ruleForm.password,
          state.ruleForm.username,
        );
        await router.replace("/");
      } else {
        console.log('註冊失敗', fields)
      }
    })
  },
}

const rules = reactive<FormRules<RuleForm>>({
  email: [
    {
      required: true,
      message: '請輸入您的EMAIL',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '請輸入正確的EMAIL格式',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      message: '請輸入您的密碼',
      trigger: 'change',
    },
    {
      validator: pageAction.validatePass,
      trigger: 'change',
    },
  ],
  username: [
    {
      required: true,
      message: '請輸入用戶名稱', trigger: 'blur'
    },
    { min: 2, max: 8, message: '長度需介於2~8位元', trigger: 'blur' },
  ],
})
</script>
<style scoped>
.loginPage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5vw;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  background: #f8f9fb;

  padding: 0 10vw;
}

.phoneImage {
  max-width: 400px;
  position: relative;
  top: 36px;
  justify-self: end;
}

.loginForm {
  justify-self: start;
  box-shadow: 0px 4px 48px rgba(0, 0, 0, 0.06);
  border-radius: 32px;
  background: white;
  padding: 74px 60px;

  display: grid;
  place-items: center;
  row-gap: 52px;
  width: 380px;
}

.loginForm>form {
  display: grid;
  row-gap: 24px;
  width: 100%;
  height: 100%;
}

input {
  background: #fafafa;
  border-radius: 4px;
  border: none;
}

input::placeholder {
  color: #9e9e9e;
}

.loginButton {
  background: linear-gradient(89.93deg,
      #00c2ff 0.06%,
      #0047ff 105.68%);
  padding: 12px 0;
  color: white;
  border: none;
}

.info {
  color: #1da0ff;
  text-align: center;
  cursor: pointer;
}

.agreement {
  color: #a1a1a1;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>

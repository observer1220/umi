<template>
  <div class="loginPage">
    <div class="loginForm">
      <img :src="logo" alt="" loading="lazy" />
      <el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" :size="state.formSize" @submit.prevent>
        <el-form-item prop="email">
          <el-input v-model="state.ruleForm.email" placeholder="EMAIL" size="large" type="email" />
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
        <button type="submit" class="loginButton" @click="
          state.isLogin
            ? pageAction.login(ruleFormRef)
            : pageAction.register(ruleFormRef)
          ">
          {{ state.isLogin ? "登入" : "註冊" }}
        </button>
        <p @click="state.isLogin = !state.isLogin" class="info">
          {{ state.isLogin ? "還沒有帳號？點擊註冊" : "已有帳號？點擊登入" }}
        </p>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import type { FormInstance, FormRules } from "element-plus";
import type { RuleForm } from "../types/form";
import { ElNotification } from "element-plus";
import logo from "../assets/wave.png";

const router = useRouter();
const useUser = useUserStore();

const ruleFormRef = ref<FormInstance>();
const state = reactive({
  formSize: "default",
  isLogin: true,
  agreementChecked: false,
  ruleForm: {
    email: "test@gmail.com",
    password: "test1234",
    username: "",
  },
});

const pageAction = {
  validatePass(rule: any, value: string, callback: (error?: Error) => void) {
    if (value === "") {
      callback(new Error(`${rule.field} cannot be empty`));
    } else {
      if (!/^(?=.*[a-z])(?=.*\d)[^]{8,20}$/.test(value)) {
        callback(new Error("需包含英文與數字，長度介於8~20位元"));
      } else {
        callback();
      }
    }
  },
  async login(formEl: FormInstance | undefined) {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const loginResult = await useUser.loginUser({
          email: state.ruleForm.email,
          password: state.ruleForm.password,
        });

        if (loginResult === "success") {
          await router.replace("/umi");
        } else {
          ElNotification({
            title: "Error",
            message: "登入失敗",
            type: "error",
          });
        }
      } else {
        console.log("登入失敗", fields);
      }
    });
  },
  async register(formEl: FormInstance | undefined) {
    if (!state.agreementChecked) {
      ElNotification({
        title: "Error",
        message: "請先閱讀並同意隱私協議和使用規範",
        type: "error",
      });
      return;
    }

    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log("註冊成功", state.ruleForm);
        await useUser.registerUser({
          email: state.ruleForm.email,
          password: state.ruleForm.password,
          username: state.ruleForm.username,
        });
        await router.replace("/umi");
      } else {
        console.log("註冊失敗", fields);
      }
    });
  },
};

const rules = reactive<FormRules<RuleForm>>({
  email: [
    {
      required: true,
      message: "請輸入您的EMAIL",
      trigger: "blur",
    },
    {
      type: "email",
      message: "請輸入正確的EMAIL格式",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    {
      required: true,
      message: "請輸入您的密碼",
      trigger: "change",
    },
    {
      validator: pageAction.validatePass,
      trigger: "change",
    },
  ],
  username: [
    {
      required: true,
      message: "請輸入用戶名稱",
      trigger: "blur",
    },
    { min: 2, max: 8, message: "長度需介於2~8位元", trigger: "blur" },
  ],
});
</script>
<style scoped>
.loginPage {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  background: #f8f9fb;
}

.loginForm {
  box-shadow: 0px 4px 48px rgba(0, 0, 0, 0.06);
  border-radius: 32px;
  background: white;
  padding: 74px 60px;

  display: grid;
  place-items: center;
  row-gap: 52px;
  width: 380px;
}

.loginForm img {
  width: 100px;
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
  background: linear-gradient(89.93deg, #00c2ff 0.06%, #0047ff 105.68%);
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

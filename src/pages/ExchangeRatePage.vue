<template>
  <h1>匯率計算機</h1>
  <el-divider />
  <CurrencyExchange @likeClick="pageAction.test" />
  <el-dialog v-model="state.hello" title="提示訊息">
    <span>觸發EMIT重置欄位</span>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import CurrencyExchange from '../components/CurrencyExchange.vue';

const state = reactive({
  hello: false,
})

const pageAction = {
  test() {
    state.hello = true;
  }
}
</script>
<template>
  <ul>
    <li>台幣：<el-input-number v-model="ntd" :min="0" controls-position="right" size="large" precision="2" /></li>
    <li>日幣：<el-input-number v-model="currency.jpy" :min="0" controls-position="right" size="large" precision="2" /></li>
    <li>美金：<el-input-number v-model="usd" :min="0" controls-position="right" size="large" precision="2" /></li>
  </ul>
  <el-button @click="unitAction.clear">重置</el-button>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
const emit = defineEmits([
  "likeClick",
]);

const currency = reactive({
  jpy: 0,
})

const unitAction = reactive({
  clear() {
    currency.jpy = 0;
    emit('likeClick')
  }
})

// 匯率來源：https://rate.bot.com.tw/xrt?Lang=zh-TW
const exchangeRates = {
  ntd: 0.21,
  usd: 0.00675,
};

// computed()預設狀態為get，只能讀取不能寫入
const ntd = computed({
  get: () => currency.jpy * exchangeRates.ntd,
  set: (value) => currency.jpy = (value / exchangeRates.ntd),
})

const usd = computed({
  get: () => currency.jpy * exchangeRates.usd,
  set: (value) => currency.jpy = (value / exchangeRates.usd),
})
</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>
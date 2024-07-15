<template>
  <Teleport to="body">
    <div class="modal">
      <div class="backdrop" />
      <div class="modalContent">
        <button class="closeBtn" @click="closeBtn">
          <el-icon size="36">
            <Close />
          </el-icon>
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">

const emit = defineEmits(["close"]);

const closeBtn = () => {
  emit("close");
};

</script>

<style scoped>
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
}

.backdrop {
  background: rgba(0, 0, 0, 0.56);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.modalContent {
  width: 360px;
  position: relative;
  background: white;
  border-radius: 24px;
  overflow: hidden;
}

.closeBtn {
  position: absolute;
  background: none;
  border: none;
  right: 20px;
  top: 0.5em;
}
</style>

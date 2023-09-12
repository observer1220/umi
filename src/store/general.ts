import { ref } from 'vue'
import { defineStore } from 'pinia';

export const useGeneralStore = defineStore('general', () => {
  const showPostUpload = ref(false);
  const showPostDetails = ref(false);

  const changeShowPostUpload = (show) => {
    showPostUpload.value = show;
  }

  const changeShowPostDetails = (show, id) => {
    showPostDetails.value = show;
  }

  return {
    showPostUpload,
    showPostDetails,
    changeShowPostUpload,
    changeShowPostDetails,
  };
});
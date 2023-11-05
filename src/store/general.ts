import { ref } from "vue";
import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {
  const showPostUpload = ref(false);
  const showPostDetails = ref(false);

  const changeShowPostUpload = (show: boolean) => {
    showPostUpload.value = show;
  };

  const changeShowPostDetails = (show: boolean) => {
    showPostDetails.value = show;
  };

  return {
    showPostUpload,
    showPostDetails,
    changeShowPostUpload,
    changeShowPostDetails,
  };
});

import { ref } from "vue";
import { defineStore } from "pinia";
import { Theme } from "../enum/enum";

export const useGeneralStore = defineStore("general", () => {
  const showPostUpload = ref(false);
  const showPostDetails = ref(false);
  const backgroundMode = ref(Theme.Sun);

  const changeShowPostUpload = (show: boolean) => {
    showPostUpload.value = show;
  };

  const changeShowPostDetails = (show: boolean) => {
    showPostDetails.value = show;
  };

  const toggleBackgroundMode = () => {
    backgroundMode.value =
      backgroundMode.value === Theme.Moon ? Theme.Sun : Theme.Moon;
  };

  return {
    showPostUpload,
    showPostDetails,
    changeShowPostUpload,
    changeShowPostDetails,
    backgroundMode,
    toggleBackgroundMode,
  };
});

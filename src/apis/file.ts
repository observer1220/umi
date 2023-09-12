import { getJwtToken } from "./auth";
import axios from "axios";

export async function uploadFile (file) {
  const formData = new FormData();
  formData.append("files", file);

  const { data: result } = await axios({
    method: "POST",
    url: "/api/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${getJwtToken()}`,
    },
  });

  return result[0].url;
}

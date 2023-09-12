import { getJwtToken } from "../apis/auth";
import axios from "axios";

export async function request (
  url,
  { method = "GET", body, headers, auth = true } = {}
) {
  const res = await axios({
    method,
    url,
    data: body,
    headers: {
      "Content-Type": "application/json",
      ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
      ...headers,
    },
  });

  return res;
}

// http://localhost:3000/api/auth/local/register
// 取得jwt、user資訊，並存到localStorage
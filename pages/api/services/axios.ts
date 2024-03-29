import axios from "axios";
import getConfig from "next/config";
import { getDefaultAuth } from "../../../utils/storage";
const { publicRuntimeConfig } = getConfig();

const Axios = axios.create({
  baseURL: publicRuntimeConfig.backendUrl,
});
Axios.interceptors.request.use(
  (config) => {
    const token = getDefaultAuth();
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json" || "multipart/form-data",
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default Axios;

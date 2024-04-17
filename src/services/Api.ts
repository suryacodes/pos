import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { LocalStorageUtil } from "../utils";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = LocalStorageUtil.load("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const refreshToken = LocalStorageUtil.load("refreshToken");

  if (error.response?.status === 403 && refreshToken) {
    try {
      const response: { accessToken: string } = await api.post(
        "/refreshtoken",
        { refreshToken }
      );

      LocalStorageUtil.save("token", response.accessToken);

      const originalRequest: InternalAxiosRequestConfig | undefined =
        error.config;
      if (!originalRequest) {
        throw error;
      }
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.accessToken}`;

      return await api.request(originalRequest);
    } catch (error) {
      window.location.replace("/signin");
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

api.interceptors.request.use(onRequest, onRequestError);
api.interceptors.response.use(onResponse, onResponseError);

export default api;

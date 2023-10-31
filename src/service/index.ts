import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  AppAxiosRequestConfig,
  AppCreateAxiosDefaults,
  AppInternalAxiosRequestConfig,
} from "./config";

export class AppRequest {
  private instance: AxiosInstance;
  constructor(config: AppCreateAxiosDefaults) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      (config: AppInternalAxiosRequestConfig) => {
        console.log("Global Request Interceptor");
        return config;
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.instance.interceptors.response.use(
      (value: AxiosResponse) => {
        console.log("Global Response Interceptor");
        return value;
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.instance.interceptors.request.use(
      config.interceptors?.onRequestFulfilled,
      config.interceptors?.onRequestRejected
    );
    this.instance.interceptors.response.use(
      config.interceptors?.onResponseFulfilled,
      config.interceptors?.onResponseRejected
    );
  }
  request(config: AppAxiosRequestConfig) {
    if (config.interceptors?.onRequestFulfilled) {
      config = config.interceptors.onRequestFulfilled(config);
    }
    return this.instance.request({
      ...config,
    });
  }
  get(url: string, config?: AppAxiosRequestConfig) {
    return this.request({
      url,
      method: "get",
      ...config,
    });
  }
  post(url: string, config?: AppAxiosRequestConfig) {
    return this.request({
      url,
      method: "post",
      ...config,
    });
  }
  // Here you can add more requests eg. delete, put, etc.
}

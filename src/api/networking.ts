// src/api/networking.ts
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:3000";

class Networking {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Response interceptor (optional)
    this.axios.interceptors.response.use(
      (res) => res,
      (err) => {
        // central place to handle errors (you can toast here)
        return Promise.reject(err);
      }
    );
  }

  async get<T = any>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const resp = await this.axios.get<T>(path, config);
    return resp.data;
  }

  async post<T = any, U = any>(path: string, body?: U, config?: AxiosRequestConfig): Promise<T> {
    const resp = await this.axios.post<T>(path, body, config);
    return resp.data;
  }
}

export default new Networking();

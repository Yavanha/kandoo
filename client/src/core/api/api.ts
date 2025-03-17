import { AxiosRequestConfig } from "axios";
import client from "./client";

export async function get<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await client.get<T>(url, config);
  return response.data;
}

export async function post<T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await client.post<T>(url, data, config);
  return response.data;
}

export async function put<T>(
  url: string,
  data?: Partial<T>,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await client.put<T>(url, data, config);
  return response.data;
}

export async function patch<T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await client.patch<T>(url, data, config);
  return response.data;
}

export async function remove<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await client.delete<T>(url, config);
  return response.data;
}

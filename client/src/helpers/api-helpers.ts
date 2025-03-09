import { AxiosRequestConfig } from "axios";
import BaseQueryFetch from "./axios.instance";

const client = BaseQueryFetch.instance;

export async function get<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await client.get<T>(url, config);
  return response.data;
}

export async function post<T>(
  url: string,
  data?: Partial<T>,
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

export async function patch<T>(
  url: string,
  data?: Partial<T>,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await client.patch<T>(url, data, config);
  return response.data;
}

export async function deleteRdequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await client.delete<T>(url, config);
  return response.data;
}

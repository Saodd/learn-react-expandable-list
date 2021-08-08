import axios, { AxiosRequestConfig } from 'axios';
import { MockGet } from './mock';

export async function get<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
  if (MockGet[url]) return MockGet[url]();
  return axios.get<R>(url, config).then((resp) => resp.data);
}

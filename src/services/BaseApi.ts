import { AxiosRequestHeaders } from 'axios';
import Vue from 'vue';

export default class BaseApi {
  static BASE_API = 'http://localhost:3080';

  static async sendRequest(
    method: string,
    body: any = {},
    headers: AxiosRequestHeaders = {},
  ): Promise<any> {
    try {
      const { data } = await Vue.axios.post(BaseApi.BASE_API + method, body, {
        withCredentials: true,
      });
      return data;
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }
}

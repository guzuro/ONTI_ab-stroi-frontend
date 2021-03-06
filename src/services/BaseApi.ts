import { AxiosRequestHeaders } from 'axios';
import Vue from 'vue';

export default class BaseApi {
  static BASE_API = 'http://localhost:3080';

  static async sendRequest(
    method: string,
    body: any = {},
    headers: any = {},
  ): Promise<any> {
    try {
      const response = await Vue.axios.post(BaseApi.BASE_API + method, body, {
        withCredentials: true,
        ...headers,
      });
      return response;
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }
}

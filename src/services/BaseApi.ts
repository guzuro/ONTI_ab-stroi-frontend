import { AxiosRequestHeaders } from 'axios';
import Vue from 'vue';

export default class BaseApi {
  static BASE_API = 'http://localhost:8080/';

  static async sendRequest(
    method: string,
    body: any = {},
    headers: AxiosRequestHeaders = {},
  ): Promise<any> {
    try {
      return Vue.axios.post(BaseApi.BASE_API + method, body, headers);
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }
}

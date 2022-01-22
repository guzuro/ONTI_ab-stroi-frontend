import { RoleCustomer } from '@/types/types';
import BaseApi from './BaseApi';

export default class UserService {
  static BASE_PATH = '/user';

  static async getUserData(): Promise<any> {
    const getUserDataPath = '/getuserdata';
    return BaseApi.sendRequest(UserService.BASE_PATH + getUserDataPath);
  }

  static async createCustomer(reqBody: RoleCustomer): Promise<any> {
    const createClientPath = '/createclient';
    return BaseApi.sendRequest(UserService.BASE_PATH + createClientPath, reqBody);
  }

  static async getClients(): Promise<any> {
    const getClientsPath = '/getclients';
    return BaseApi.sendRequest(UserService.BASE_PATH + getClientsPath, null);
  }
}

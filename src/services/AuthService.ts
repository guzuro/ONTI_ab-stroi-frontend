import { LoginData, RegistrationData } from '@/types/types';
import BaseApi from './BaseApi';

export default class AuthService {
  static BASE_PATH = '/auth';

  static async register(reqBody: RegistrationData): Promise<void> {
    const registerPath = '/register';
    return BaseApi.sendRequest(AuthService.BASE_PATH + registerPath, reqBody);
  }

  static async login(reqBody: LoginData): Promise<any> {
    const loginPath = '/login';
    return BaseApi.sendRequest(AuthService.BASE_PATH + loginPath, reqBody);
  }

  static async logout(): Promise<any> {
    const logoutPath = '/logout';
    return BaseApi.sendRequest(AuthService.BASE_PATH + logoutPath);
  }
}

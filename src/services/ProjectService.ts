import BaseApi from './BaseApi';

export default class ProjectService {
  static BASE_PATH = '/project';

  static async addProject(reqBody: any): Promise<any> {
    const addProjectPath = '/add';
    return BaseApi.sendRequest(ProjectService.BASE_PATH + addProjectPath, reqBody);
  }

  // eslint-disable-next-line camelcase
  static async getProject(reqBody: { order_id: number }): Promise<any> {
    const getProjectPath = '/get';
    return BaseApi.sendRequest(ProjectService.BASE_PATH + getProjectPath, reqBody);
  }

  static async updateProject(reqBody: any): Promise<any> {
    const updateProjectPath = '/update';
    return BaseApi.sendRequest(ProjectService.BASE_PATH + updateProjectPath, reqBody);
  }

  static async doPayment(reqBody: any): Promise<any> {
    const doPaymentPath = '/doPayment';
    return BaseApi.sendRequest(ProjectService.BASE_PATH + doPaymentPath, reqBody);
  }

  static async addStep(reqBody: any): Promise<any> {
    const addStepPath = '/addstep';
    return BaseApi.sendRequest(ProjectService.BASE_PATH + addStepPath, reqBody);
  }

  static async payStep(reqBody: any): Promise<any> {
    const payStepPath = '/doStepPayment';
    return BaseApi.sendRequest(ProjectService.BASE_PATH + payStepPath, reqBody);
  }
}

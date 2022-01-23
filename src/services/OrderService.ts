import BaseApi from './BaseApi';

export default class OrderService {
  static BASE_PATH = '/order';

  // eslint-disable-next-line camelcase
  static async createOrder(reqBody: { client_id: number }): Promise<{ order_id:number }> {
    const createOrderPath = '/create';
    return BaseApi.sendRequest(OrderService.BASE_PATH + createOrderPath, reqBody);
  }

  // eslint-disable-next-line camelcase
  static async getOrderById(reqBody: { order_id:number }): Promise<any> {
    const createClientPath = '/getbyid';
    return BaseApi.sendRequest(OrderService.BASE_PATH + createClientPath, reqBody);
  }
}

import BaseApi from './BaseApi';

export default class OrderService {
  static BASE_PATH = '/order';

  // eslint-disable-next-line camelcase
  static async createOrder(reqBody: {
    // eslint-disable-next-line camelcase
    client_id: number;
    // eslint-disable-next-line camelcase
  }): Promise<{ order_id: number }> {
    const createOrderPath = '/create';
    return BaseApi.sendRequest(OrderService.BASE_PATH + createOrderPath, reqBody);
  }

  // eslint-disable-next-line camelcase
  static async getOrderById(reqBody: { order_id: number }): Promise<any> {
    const getOrderByIdPath = '/getbyid';
    return BaseApi.sendRequest(OrderService.BASE_PATH + getOrderByIdPath, reqBody);
  }

  static async saveContract(reqBody: any): Promise<any> {
    const saveContractPath = '/contract/save';
    return BaseApi.sendRequest(OrderService.BASE_PATH + saveContractPath, reqBody, {
      headers: {
        'Content-Type': 'multpart/form-data',
      },
    });
  }

  static async getContract(reqBody: any): Promise<any> {
    const saveContractPath = '/contract/get';
    return BaseApi.sendRequest(OrderService.BASE_PATH + saveContractPath, reqBody);
  }
}

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

  static async saveOrderDoc(reqBody: any): Promise<any> {
    const saveOrderDocPath = '/order/saveOrderDoc';
    return BaseApi.sendRequest(OrderService.BASE_PATH + saveOrderDocPath, reqBody, {
      headers: {
        'Content-Type': 'multpart/form-data',
      },
    });
  }

  static async approveOrder(reqBody: any): Promise<any> {
    const approveOrderPath = '/order/approveOrder';
    return BaseApi.sendRequest(OrderService.BASE_PATH + approveOrderPath, reqBody);
  }

  static async approveContract(reqBody: any): Promise<any> {
    const approveContractPath = '/contract/approve';
    return BaseApi.sendRequest(OrderService.BASE_PATH + approveContractPath, reqBody);
  }

  static async saveSmeta(reqBody: any): Promise<any> {
    const saveSmetaPath = '/smeta/save';
    return BaseApi.sendRequest(OrderService.BASE_PATH + saveSmetaPath, reqBody);
  }

  static async approveSmeta(reqBody: any): Promise<any> {
    const approveSmetaPath = '/smeta/approve';
    return BaseApi.sendRequest(OrderService.BASE_PATH + approveSmetaPath, reqBody);
  }
}

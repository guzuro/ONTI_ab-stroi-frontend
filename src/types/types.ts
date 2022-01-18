// eslint-disable-next-line no-shadow
export enum RoleEnum {
  Administrator = 'ADMINISTRATOR',
  Customer = 'CUSTOMER',
}

export type BaseUserInfo = {
  id?: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
  createdAt: string;
};

export type RegistrationData = Omit<BaseUserInfo, 'id' | 'createdAt'>;

export type LoginData = Pick<RegistrationData, 'login' | 'password'>;

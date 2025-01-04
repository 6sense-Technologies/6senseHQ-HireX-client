export type LoginFormInputs = {
  email: string;
  password: string;
  grantType?: string;
};

export type SingupFormInputs = {
  name: string;
  email: string;
  password: string;
  Cpassword?: string;
  roleNames: string[];
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type UserInfo = {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthState = {
  tokens: Tokens;
  userInfo: UserInfo | null;
};

export interface GoogleAuthTypes {
  provider: string;
  authCode: string;
}

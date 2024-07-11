export interface RuleForm {
  email: string;
  password: string;
  username: string;
}

export interface User {
  email: string;
  username: string;
  avatar: string;
}

export interface MutationPayload {
  type: string;
  storeId: string;
  events: {
    newValue: string;
  };
}
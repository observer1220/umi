export interface SignUpResponse {
  data: {
    user: any;
    session: any;
  };
  error: any;
}

export interface RegisterParams {
  email: string;
  username: string;
  password: string;
}


export interface LoginParams {
  email: string;
  password: string;
}
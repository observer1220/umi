export interface CreateUser {
  email: string, 
  username: string, 
  auth_id: number
}

export interface User {
  id: number,
  username: string,
  brief: string,
  mobile: string,
  gender: string,
  avatar: string
}
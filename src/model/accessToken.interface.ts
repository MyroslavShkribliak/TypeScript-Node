export interface IAccessTokenInterface {
  _id: string;
  accessToken: string;
  refreshToken: string;
  _user_id: string;
  createdAt: string;
  updatedAt: string;
}


export interface IUserPayload {
  _user_Id: number,
}

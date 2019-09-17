
export interface IUser {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  verifyToken: String;
  roleType: String;
  status: Boolean;
  loggedInIp: String;
  loggedInAt: Date;
  salt: String;
  profileImage: String;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: Boolean;
}

export interface IUserTokenData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  randomKey?: string;
  parentId?: string;
  subdomain?: string;
}

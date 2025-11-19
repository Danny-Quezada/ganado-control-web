export class UserModel {
  userId: number;
  name: string;
  email: string;
  userIdAuth: string;
  password: string;
  constructor(userId: number, name: string, email: string, userIdAuth: string, password: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.userIdAuth = userIdAuth;
    this.password = password;
  }
}
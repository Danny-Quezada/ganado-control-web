import { UserModel } from "../models/UserModel";
import IModel from "./IModel";

export default interface IUserModel extends IModel<UserModel> {
    signInEmail(email: string, password: string): Promise<UserModel>;

    getUserById(userId: number): Promise<UserModel>;
    signOut(): Promise<void>;
    
}
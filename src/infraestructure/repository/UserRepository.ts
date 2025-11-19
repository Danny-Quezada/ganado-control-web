import type IUserModel from "../../domain/interfaces/IUserModel";
import { UserModel } from "../../domain/models/UserModel";
import supabase from "../../domain/db/SupabaseClient";
export default class UserRepository implements IUserModel {
  private _db = supabase;
  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async signInEmail(email: string, password: string): Promise<UserModel> {
    try {
     

      const { data, error } = await this._db.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {

        throw new Error(error.message);
      }

      if (!data || !data.user) {
        throw new Error("No user data returned");
      }
      const { data: userData, error: userError } = await this._db
        .from("users")
        .select("userid")
        .eq("userIdAuth", data.user.id)
        .single();
      if (userError) {
        throw new Error(userError.message);
      }
      const user: UserModel = new UserModel(
        userData?.userid || 0,
        data.user.user_metadata?.name || "",
        data.user.email || "",
        data.user.id || "",
        ""
      );

      return user;
    } catch (error: any) {
      
      throw new Error(error.message || "Error signing in");
    }
  }

  getUserById(userId: number): Promise<UserModel> {
    throw new Error("Method not implemented.");
  }

  async create(t: UserModel): Promise<UserModel> {
    // Validación rápida
    if (!t.email || !t.password || !t.name) {
      throw new Error("Missing required user fields");
    }

   
    const { data: existingUsers, error: errorCheckingEmail } = await this._db
      .from("users")
      .select("userid")
      .eq("email", t.email);

    if (errorCheckingEmail) {
      throw new Error(
        `Error checking existing email: ${errorCheckingEmail.message}`
      );
    }

    if (existingUsers && existingUsers.length > 0) {
      throw new Error("User already exists, try to another email");
    }

   
    const { data: authData, error: authError } = await this._db.auth.signUp({
      email: t.email,
      password: t.password,

      options: {
        data: { name: t.name }, // opcional si usás metadatos
      },
    });

    if (authError) {
      throw new Error(`Auth error: ${authError.message}`);
    }

    if (!authData?.user?.id) {
      throw new Error("Unexpected error during authentication");
    }

    const newUser = new UserModel(
      0,
      t.name,
      t.email,
      authData.user.id,
      "" 
    );

    const { data: userData, error: insertError } = await this._db
      .from("users")
      .insert({
        userIdAuth: newUser.userIdAuth,
        name: newUser.name,
        email: newUser.email,
      })
      .select("userid")
      .single();
    if (insertError) {
      throw new Error(`Insert error: ${insertError.message}`);
    }
    newUser.userId = userData?.userid;
  
    return newUser;
  }

  async read(readById: number): Promise<UserModel[]> {
    throw new Error("Method not implemented.");
  }
  async update(t: UserModel): Promise<UserModel> {
    throw new Error("Method not implemented.");
  }
  async delete(t: UserModel): Promise<UserModel> {
    throw new Error("Method not implemented.");
  }
}
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserModel } from "../domain/models/UserModel";
import UserRepository from "../infraestructure/repository/UserRepository";
import type IUserModel from "../domain/interfaces/IUserModel";


type UserStore = {
  user: UserModel | null;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUp: (user: UserModel) => Promise<void>;
  getUserById: (userId: number) => Promise<void>;
  signOut: () => void;
  
};

const userRepository: IUserModel = new UserRepository();

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null as UserModel | null,

      signInEmail: async (email: string, password: string) => {
        const user = await userRepository.signInEmail(email, password);
        set({ user: user });
      },

      signUp: async (user: UserModel) => {
        const userCreated = await userRepository.create(user);
        set({ user: userCreated });
        
      },

      getUserById: async (userId: number) => {
        const user = await userRepository.getUserById(userId);

        set({ user: user });
      },

      signOut: async () => {
        await userRepository.signOut();
        set({ user: null });
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        return { user: state.user }; 
      },
    }
  )
);

export default useUserStore;
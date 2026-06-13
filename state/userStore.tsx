import { login, validateToken } from "@/services/userService";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type UserState = {
  users: User[];
  id: number;
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  editUser: (user: User) => void;
  login: (email: string, password: string) => Promise<Boolean>;
  validateToken: (token: string) => Promise<Boolean>;
};

export const useUserStore = create<UserState>((set) => ({
  users: [],
  id: 0,
  login: async (email, password) => {
    try {
      const token = await login(email, password);

      // Save token
      await AsyncStorage.setItem("authToken", token);

      console.log("Login successful, token stored:", token);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },
  addUser: (user) => {
    set((state) => {
      return {
        users: [...state.users, user],
        id: state.id + 1,
      };
    });
  },

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
  editUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === updatedUser.id ? { ...u, ...updatedUser } : u
      ),
    })),
  validateToken: async (token: string) => {
    try {
      const isValidate = await validateToken(token);
      return isValidate;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}));

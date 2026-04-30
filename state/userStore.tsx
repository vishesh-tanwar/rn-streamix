import { create } from "zustand";

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
}

type UserState = {
    users: User[];
    id: number;
    addUser: (user: User) => void;
    removeUser: (id: string) => void;
    editUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
    users: [],
    id: 0,
    addUser: (user) =>
        set((state) => {
            return {
                users: [...state.users, user],
                id: state.id + 1,
            };
        }),
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
}));
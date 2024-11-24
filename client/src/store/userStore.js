import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set, get) => ({
  user:{},

  addUser: (data) => set({user:data}),

  resetUser: () => set({ user: {} }),
});

const useUserStore = create(devtools(persist(userStore, { name: "user" })));

export default useUserStore;


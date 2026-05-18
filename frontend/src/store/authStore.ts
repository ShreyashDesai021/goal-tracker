import { create }
from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
};

const savedUser =
  localStorage.getItem(
    "user"
  );

export const useAuthStore =
  create<AuthStore>(
    (set) => ({

      user:
        savedUser
          ? JSON.parse(
              savedUser
            )
          : null,

      token:
        localStorage.getItem(
          "token"
        ),

      login:
        (token, user) => {

          localStorage.setItem(
            "token",
            token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              user
            )
          );

          set({
            token,
            user,
          });
        },

      logout:
        () => {

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          set({
            token:
              null,

            user:
              null,
          });
        },
    })
  );
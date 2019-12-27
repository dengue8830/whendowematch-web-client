import { IUser } from "../types/types";

const USER = "USER";
const TOKEN = "TOKEN";

class SStorage {
  setUser(user: IUser) {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  getUser(): IUser | undefined {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : undefined;
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }
}
export const sstorage = new SStorage();

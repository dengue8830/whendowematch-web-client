import { IUser } from "../types/types";

const USER = 'USER';

class SStorage {
  setUser(user: IUser) {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  getUser(): IUser | undefined {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : undefined;
  }
}
export const sstorage = new SStorage();
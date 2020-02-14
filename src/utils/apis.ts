import { http } from './http';
import { IUser } from '../types/types';
import { config } from './config';

export const apis = {
  async register(user: {
    name;
    color;
  }): Promise<{ token: string; user: IUser }> {
    const res = await http.post<{ token: string; user: IUser }>(
      `${config.apiServer}/api/auth/register`,
      user
    );
    return res.data;
  }
};

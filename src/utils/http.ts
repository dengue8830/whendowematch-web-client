import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { Errors } from '../types/types';

export interface IHttpResponse<T> {
  data: T;
}

class Http {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
  }

  setCredentials(token: string) {
    this.instance.defaults.headers.common.Authorization = 'bearer ' + token;
    // this.instance.defaults.headers.common.paquete = paquete;
    // JWTUtils.parseJwt(resLogin.data.token).usuario.id
  }

  clearCredentials() {
    this.instance.defaults.headers.common = undefined;
  }

  private processRequest<T>(axiosPromise: AxiosPromise): Promise<IHttpResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosPromise.then(res => {
        resolve({ data: res.data });
      }).catch(error => {
        /** La causa debe corresponder con una entrada del enum Errors */
        error.message = error.response && error.response.data && error.response.data.error || error.message || Errors.Unknown;
        error.extra = {
          url: error.request.responseURL,
          status: error.request.status,
          method: error.config.method,
          response: error.request.responseText
        };
        reject(error);
      });
    });
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.processRequest<T>(this.instance.get(url, config));
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.processRequest<T>(this.instance.post(url, data, config));
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.processRequest<T>(this.instance.put(url, data, config));
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.processRequest<T>(this.instance.delete(url, config));
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.processRequest<T>(this.instance.head(url, config));
  }

  async isConnected() {
    try {
      await this.head('https://www.google.com', { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const http = new Http();

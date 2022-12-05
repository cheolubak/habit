import axios, { AxiosInstance } from 'axios';

export class Request {
  private readonly _instance: AxiosInstance;

  constructor(baseURL: string, headers?: { [key: string]: string }) {
    this._instance = axios.create({
      baseURL,
      headers,
    });
  }

  get instance(): AxiosInstance {
    return this._instance;
  }
}

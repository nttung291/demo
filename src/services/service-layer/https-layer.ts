import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GenericError } from "./errors";
import { HTTPS_BASE_URL, APP_API_KEY } from "../config";

export type ApiResponse = AxiosResponse;
export class HttpClient {
  private static instance: HttpClient;

  static client = axios.create({
    baseURL: `${HTTPS_BASE_URL}`,
    timeout: 30000,
    headers: {
      Accepts: "application/json",
      "X-CMC_PRO_API_KEY": APP_API_KEY,
    },
  });

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }

    return HttpClient.instance;
  }

  private isValidResponse(response: AxiosResponse) {
    return response.status >= 200 && response.status <= 399;
  }

  private buildApiError(response: AxiosResponse) {
    return new GenericError("There are something wrong", response.status, {
      ...response,
    });
  }

  public post = (endpoint: string, payload?: unknown): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      HttpClient.client
        .post(endpoint, payload)
        .then((response) => {
          if (this.isValidResponse(response)) {
            resolve(response);
          } else {
            reject(this.buildApiError(response));
          }
        })
        .catch((error) => {
          if (error.response) {
            reject(this.buildApiError(error.response));
          } else {
            reject(this.buildApiError(error));
          }
        });
    });
  };

  public patch = (
    endpoint: string,
    payload?: unknown
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      HttpClient.client
        .patch(endpoint, payload)
        .then((response) => {
          if (this.isValidResponse(response)) {
            resolve(response);
          } else {
            reject(this.buildApiError(response));
          }
        })
        .catch((error) => {
          if (error.response) {
            reject(this.buildApiError(error.response));
          } else {
            reject(this.buildApiError(error));
          }
        });
    });
  };

  public delete = (endpoint: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      HttpClient.client
        .delete(endpoint)
        .then((response) => {
          if (this.isValidResponse(response)) {
            resolve(response);
          } else {
            reject(this.buildApiError(response));
          }
        })
        .catch((error) => {
          if (error.response) {
            reject(this.buildApiError(error.response));
          } else {
            reject(this.buildApiError(error));
          }
        });
    });
  };

  public get = (
    endpoint: string,
    params?: AxiosRequestConfig["params"]
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      HttpClient.client
        .get(endpoint, params)
        .then((response) => {
          if (this.isValidResponse(response)) {
            resolve(response);
          } else {
            reject(this.buildApiError(response));
          }
        })
        .catch((error) => {
          if (error.response) {
            reject(this.buildApiError(error.response));
          } else {
            reject(this.buildApiError(error));
          }
        });
    });
  };
}

import { HttpClient } from "./service-layer/https-layer";
import { get as _get } from "lodash";

const httpsClient = HttpClient.getInstance();

export const getFavoriteProductIds = async (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    httpsClient
      .get("v1/cryptocurrency/listings/latest")
      .then((response) => {
        const products = _get(response, "data.data", []);
        resolve(products);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

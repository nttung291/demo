import { HttpClient } from './service-layer/https-layer';
import { get as _get } from 'lodash';

const httpsClient = HttpClient.getInstance();

export const getFavoriteProductIds = async (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    httpsClient.get('favourites')
      .then((response) => {
        const products = _get(response, 'data.data', [])
        resolve(products);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const likeProducts = async (productId: string): Promise<Response> => {
  return new Promise((resolve, reject) => {
    httpsClient.patch(`favourites/${productId}`)
      .then((response) => {
        const products = _get(response, 'data.data', [])
        resolve(products);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const unlikeProducts = async (productId: string): Promise<Response> => {
  return new Promise((resolve, reject) => {
    httpsClient.delete(`favourites/${productId}`)
      .then((response) => {
        const products = _get(response, 'data.data', [])
        resolve(products);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

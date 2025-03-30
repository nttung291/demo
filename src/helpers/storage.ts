import * as Keychain from "react-native-keychain";

export enum StorageKey {
  TOKEN = "token"
}

type TokenData = {
  accessToken?: string;
  orgToken?: string;
  refreshToken?: string;
};

export const setKeychainItem = async (data: Partial<TokenData>): Promise<void> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    const existingData = credentials ? JSON.parse(credentials.password) : {};
    const newData = { ...existingData, ...data };

    await Keychain.setGenericPassword(StorageKey.TOKEN, JSON.stringify(newData));
  } catch (error) {
    console.log("Error setting token data:", error);
    throw error;
  }
};

export const getKeychainItem = async (): Promise<TokenData> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return JSON.parse(credentials.password) as TokenData;
    }
    return {};
  } catch (error) {
    console.log("Error getting token data:", error);
    throw error;
  }
};

export const deleteKeychainItem = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.log("Error clearing token data:", error);
    throw error;
  }
};
// storage/secureStorage.ts
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || "fallback-dev-key-change-me";

export const secureStorage = {
  setItem: (key: string, value: string) => {
    const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    localStorage.setItem(key, encrypted);
  },
  getItem: (key: string): string | null => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return null;
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

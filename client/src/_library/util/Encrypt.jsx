import CryptoJS from "crypto-js";

// Encrypt function using Vite environment variable
export default function Encrypt(data) {
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }
  
  const cipherText = CryptoJS.AES.encrypt(data, secretKey).toString();
  return cipherText;
}

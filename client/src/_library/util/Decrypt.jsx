// decrypt.js

import CryptoJS from "crypto-js";

// Decrypt function to decrypt the given cipherText
const Decrypt = (cipherText) => {
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; // Access the VITE environment variable

  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    if (bytes.sigBytes > 0) {
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    }
  } catch (error) {
    // Handle any errors (return null for error cases to prevent crashes)
    console.error("Decryption error:", error);
    return null;
  }

  return null; // Return null if decryption fails
};

// Exporting the decrypt function
export default Decrypt;

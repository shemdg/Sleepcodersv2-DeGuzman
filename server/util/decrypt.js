const CryptoJS = require("crypto-js");

function decrypt(cipherText) {
  // Check for null or undefined input
  if (cipherText === null || cipherText === undefined) {
    return null;
  }

  // Ensure the cipherText is a string
  if (typeof cipherText !== "string") {
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (decryptedData) {
      return decryptedData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

module.exports = decrypt;

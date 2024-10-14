const CryptoJS = require("crypto-js");

function decrypt(cipherText) {
  // Check for null or undefined input
  if (cipherText === null || cipherText === undefined) {
<<<<<<< HEAD
    
    return null; 
  }

  // Ensure the cipherText is a string
  if (typeof cipherText !== 'string') {
    
    return null; 
=======
    return null;
  }

  // Ensure the cipherText is a string
  if (typeof cipherText !== "string") {
    return null;
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
  }

  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

<<<<<<< HEAD
    
    if (decryptedData) {
      
      return decryptedData;
    } else {
      
      return null;
    }
  } catch (error) {
    
=======
    if (decryptedData) {
      return decryptedData;
    } else {
      return null;
    }
  } catch (error) {
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    return null;
  }
}

module.exports = decrypt;

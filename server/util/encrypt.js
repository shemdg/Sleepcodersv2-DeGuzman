

const CryptoJS = require("crypto-js");

function encrypt(data) {
  
  if (data === null || data === undefined) {
    
  }

  if (typeof data !== 'string') {
    
    return null; 
  }

  const cipherText = CryptoJS.AES.encrypt(data, process.env.SECRET_KEY).toString();
  return cipherText;
}

module.exports = encrypt;

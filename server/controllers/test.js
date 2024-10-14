const CryptoJS = require("crypto-js");

exports.TestController = async (req, res) => {
  try {
    
    res.status(200).send("Hello, World!");
  } catch (error) {
    
    res.status(500).send("An error occurred.");
  }
};

function encrypt(data, key) {
  const cipherTest = CryptoJS.AES.encrypt(data, key).toString();
  return cipherTest;
}

function decrypt(cipherText, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    if (bytes.sigBytes > 0) {
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    }
  } catch (error) {
    
    res.status(500).send("An error occurred.");
  }
}

exports.HtmlTestEncrypt = async (req, res, next) => {
  res.send(`
      <html>
        <body>
          <h2>Encrypt Data</h2>
          <form action="/encrypt" method="POST">
            <label for="data">Data:</label><br>
            <input type="text" id="data" name="data" required><br><br>
            <label for="key">Key:</label><br>
            <input type="text" id="key" name="key" required><br><br>
            <button type="submit">Encrypt</button>
          </form>
        </body>
      </html>
    `);
};

exports.TestEncrypt = async (req, res, next) => {
  try {
    const { data, key } = req.body;
    const encrypted = encrypt(data, key);
    res.json({ encrypted });
  } catch (error) {
    // H\
    res.status(500).send("An error occurred.");
  }
};

exports.testDecrypt = async (req, res, next) => {
  const { encryptedData, key } = req.body;

  const decryptedData = decrypt(encryptedData, key);
  res.json({ decryptedData });
};

exports.HtmlTestDecrypt = async (req, res, next) => {
  res.send(`
          <html>
            <body>
              <h2>Decrypt Data</h2>
              <form action="/decrypt" method="POST">
                <label for="encryptedData">Encrypted Data:</label><br>
                <input type="text" id="encryptedData" name="encryptedData" required><br><br>
                <label for="key">Key:</label><br>
                <input type="text" id="key" name="key" required><br><br>
                <button type="submit">Decrypt</button>
              </form>
            </body>
          </html>
        `);
};

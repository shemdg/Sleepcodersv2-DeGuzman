
const express = require("express");
const router = express.Router();

const TestController = require("../controllers/test");

router.get("/", TestController.TestController)

router.get("/html-encrypt", TestController.HtmlTestEncrypt)
router.post("/encrypt", TestController.TestEncrypt)

router.get("/html-decrypt", TestController.HtmlTestDecrypt)
router.post("/decrypt", TestController.testDecrypt)

module.exports = router;

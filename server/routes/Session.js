const express = require("express");
const router = express.Router();

const SessionController = require("../controllers/Session");

router.post('/session-check', SessionController.findSession);


module.exports = router;

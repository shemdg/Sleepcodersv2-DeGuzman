const express = require("express");
const router = express.Router();

const EventCon = require("../controllers/Events");


router.post("/event/specific-date", EventCon.FetchSpecificDateEvent)

router.post("/event/post-event", EventCon.PostDateEvent)


module.exports = router;

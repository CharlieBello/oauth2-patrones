const express = require("express");
const router = express.Router();
const oauth2Controller = require("../controllers/oauth2");

router.get("/authorize", oauth2Controller.authorization);
router.post("/token", oauth2Controller.token);

module.exports = router;
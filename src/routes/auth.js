const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth");

router.post("/signup", controller.signup.post);

router.post("/signin", controller.signin.post);

module.exports = router;

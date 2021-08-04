const express = require("express");
const controller = require("../controllers/users");

const router = express.Router();

router.get("/:id", controller.id.get);

module.exports = router;

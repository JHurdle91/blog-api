const express = require("express");
const controller = require("../controllers/users");

const router = express.Router();

router.get("/", controller.index.get);

const CREATE = "/create";
router.post(CREATE, controller.create.post);

router.get("/:id", controller.id.get);

const UPDATE = "/:id/update";
router.post(UPDATE, controller.update.post);

const DELETE = "/:id/delete";
const { destroy } = controller;
router.post(DELETE, destroy.post);

module.exports = router;

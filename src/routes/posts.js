const express = require("express");
const controller = require("../controllers/posts");

const router = express.Router();

const CREATE = "/create";
router.get(CREATE, controller.create.get);
router.post(CREATE, controller.create.post);

router.get("/:id", controller.id.get);

const UPDATE = "/:id/update";
router.get(UPDATE, controller.update.get);
router.post(UPDATE, controller.update.post);

const DELETE = "/:id/delete";
const { destroy } = controller;
router.get(DELETE, destroy.get);
router.post(DELETE, destroy.post);

module.exports = router;

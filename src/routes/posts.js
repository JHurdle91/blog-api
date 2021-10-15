const express = require("express");
const controller = require("../controllers/posts");

const router = express.Router();

router.get("/", controller.index.get);

const CREATE = "/create";
router.post(CREATE, controller.create.post);

router.get("/:id", controller.id.get);

const UPDATE = "/:id/update";
router.post(UPDATE, controller.update.post);

const PUBLISHED = "/:id/published";
router.get(PUBLISHED, controller.published.get);
router.post(PUBLISHED, controller.published.post);

const DELETE = "/:id/delete";
const { destroy } = controller;
router.post(DELETE, destroy.post);

module.exports = router;

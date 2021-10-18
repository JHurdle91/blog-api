const express = require("express");
const controller = require("../controllers/comments");

const router = express.Router();

router.get("/", controller.index.get);

const CREATE = "/create";
router.post(CREATE, controller.create.post);

router.get("/:commentId", controller.id.get);

const UPDATE = "/:commentId/update";
router.post(UPDATE, controller.update.post);

const DELETE = "/:commentId/delete";
router.post(DELETE, controller.delete.post);

module.exports = router;

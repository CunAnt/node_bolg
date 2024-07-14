const express = require("express");
const router = express.Router();

const coursesController = require("../app/controllers/CourseControllers");

router.get("/create", coursesController.create);
router.get("/getUpdate", coursesController.getUpdate);
router.get("/update/:slug", coursesController.detailUpdate);
router.post("/postUpdate", coursesController.postUpdate);
router.post("/delete/:id", coursesController.delete);
router.post("/store", coursesController.store);
router.get("/:slug", coursesController.show);

module.exports = router;

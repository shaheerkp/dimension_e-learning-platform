import express from "express";
import formidable from "express-formidable"

const router = express.Router();

import { create, readCourse, removeImage, uploadImage, uploadVideo } from "../controllers/course.js";
import { isInstructor, requireSignin } from "../middlewares/index.js";

router.post("/course/upload-image", requireSignin, uploadImage);

router.post("/course/remove-image", requireSignin, removeImage);

router.post("/course",requireSignin,isInstructor,create)

router.get("/course/:slug",readCourse)

router.post("/course/video-upload",requireSignin,uploadVideo)

module.exports = router;

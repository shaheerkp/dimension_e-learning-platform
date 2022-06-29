import express from "express";
import formidable from "express-formidable";

const router = express.Router();

import {
  create,
  readCourse,
  removeImage,
  uploadImage,
  uploadVideo,
  removeVideo,
  addLesson,
  update,
  removeLesson,
  updateLesson,
} from "../controllers/course.js";
import { isInstructor, requireSignin } from "../middlewares/index.js";

router.post("/course/upload-image", requireSignin, uploadImage);

router.post("/course/remove-image", requireSignin, removeImage);

router.post("/course", requireSignin, isInstructor, create);

router.put("/course/:slug", requireSignin, isInstructor, update);

router.get("/course/:slug", readCourse);

router.post("/course/video-upload/:instructorId", requireSignin, uploadVideo);

router.post("/course/video-remove/:instructorId", requireSignin, removeVideo);

router.post("/course/lesson/:slug/:instructorId", requireSignin, addLesson);
router.put("/course/lesson/:slug/:instructorId", requireSignin, updateLesson);

router.put("/course/:slug/:lessonId", requireSignin, removeLesson);
// api/course/lesson/${slug}/${course.instructor._id}

module.exports = router;

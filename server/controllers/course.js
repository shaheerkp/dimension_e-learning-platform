import AWS from "aws-sdk";
import { nanoid } from "nanoid";
import Course from "../models/course";
import slugify from "slugify";
import fs from "fs";
var path = require("path");

const awsConfiq = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfiq);

export const uploadImage = async (req, res) => {
  const { image } = req.files;

  try {
    if (!image) return res.status(400).send("no image");
    console.log(image);
    const base64Data = req.files.image.data;

    const type = req.files.image.mimetype;

    console.log(type, base64Data);

    const params = {
      Bucket: "diemension-bucket",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: type,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      console.log(data);
      res.send(data);
    });
  } catch (error) {
    console.log(err);
  }
};

export const removeImage = (req, res) => {
  const { Bucket, key } = req.body;

  try {
    const params = {
      Bucket,
      Key: key,
    };

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
      res.send({ ok: true });
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req, res) => {
  try {
    const alreadyExsist = await Course.findOne({
      slug: slugify(req.body.name.toLowerCase()),
    });

    if (alreadyExsist) return res.status(400).send("Title is taken");

    const course = await new Course({
      slug: slugify(req.body.name),
      instructor: req.user._id,
      ...req.body,
    }).save();
    res.json(course);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Course create failed.Try again");
  }
};

export const readCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.slug)
      .populate("instructor", "_id name")
      .exec();
    res.json(course);
  } catch (error) {
    console.log(error);
  }
};

export const uploadVideo = async (req, res) => {
  try {
    if (req.user._id != req.params.instructorId) {
      return res.status(400).send("Unauthorised");
    }
    const { video } = req.files;
    // const path=`${__dirname}`
    const type = video.mimetype.split("/")[1];
    fs.writeFileSync(
      __dirname + "\\..\\video\\" + `upload.${type}`,
      video.data
    );
    let videofile = fs.readFileSync(
      __dirname + "\\..\\video\\" + `upload.${type}`
    );

    if (!video) return res.status(400).send("No video");
    const params = {
      Bucket: "diemension-bucket",
      Key: `${nanoid()}.${type}`,
      Body: videofile,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: type,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
      res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeVideo = async (req, res) => {
  if (req.user._id != req.params.instructorId) {
    return res.status(400).send("Unauthorised");
  }
  const { Bucket, Key } = req.body;

  try {
    const params = {
      Bucket,
      Key,
    };

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
      res.send({ ok: true });
    });
  } catch (error) {
    console.log(error);
  }
};

export const addLesson = async (req, res) => {
  console.log("heeeeeeeeeeeeeeeeeeeeerreeeeeeeeeeeeeeeeeeeeeeeeeee", req.body);
  console.log("_____________________________");
  try {
    const { slug, instructorId } = req.params;
    const { title, content, video } = req.body;
    if (req.user._id != instructorId) {
      return res.status(400).send("Unauthorised");
    }
    const updated = await Course.findByIdAndUpdate(
      slug,
      { $push: { lessons: { title, content, video, slug: slugify(title) } } },
      { new: true }
    )
      .populate("instructor", "_id name")
      .exec();
    console.log("updated", updated);
    res.json(updated);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Add lesson faild");
  }
};

export const update = async (req, res) => {
  try {
    const { slug } = req.params;

    const course = await Course.findById(slug);

    if (req.user._id != course.instructor) {
      return res.status(400).send("Unauthorized");
    }

    const update = await Course.findByIdAndUpdate(slug, req.body, {
      new: true,
    }).exec();
    res.json(update);
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
};

export const removeLesson = async (req, res) => {
  console.log("hereeeeee");
  try {
    const { slug, lessonId } = req.params;
    const course = await Course.findById(slug).exec();
    console.log(course);
    if (req.user._id != course.instructor) {
      return res.status(400).send("Unauthorized");
    }

    const deletedCourse = await Course.findByIdAndUpdate(course._id, {
      $pull: { lessons: { _id: lessonId } },
    }).exec();
    console.log(deletedCourse);

    res.send({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
};

export const updateLesson = async (req, res) => {

  console.log("herrrrrrrrrrrrrrrrrrrr",req.body);
  try {
    const { slug } = req.params;
  const { _id, title, content, video, free_preview } = req.body;

  const course = await Course.findById(slug).select("instructor").exec();
  console.log("&&&",course);
  if (course.instructor != req.user._id) {
    return res.status(400).send("Unautherised");
  }

  const update = await Course.updateOne(
    { "lessons._id": _id },
    {
      $set: {
        "lessons.$.title": title,
        "lessons.$.content": content,
        "lessons.$.video": video,
        "lessons.$.free_preview": free_preview,
      },
    },
    {new:true}
  ).exec();
  console.log("update:",update);
  res.json({ok:true})
    
  } catch (error) {
    console.log(error);
    return res.status(400).send("Update failed")
  }
  
};

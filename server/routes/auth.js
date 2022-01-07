import express from "express";
const router=express.Router();
import {register, signin} from "../controllers/auth.js"

router.post('/register',register)
router.post('/signin',signin)

module.exports = router



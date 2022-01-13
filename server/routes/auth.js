import express from "express";
const router=express.Router();
import {currentUser, register, sendTestEmail, signin, signout} from "../controllers/auth.js"
import { requireSignin } from "../middlewares/index.js";

router.post('/register',register)
router.post('/signin',signin)
router.get('/signout',signout)
router.get('/current-user',requireSignin,currentUser)
router.get('/send-email',sendTestEmail)

module.exports = router   
 
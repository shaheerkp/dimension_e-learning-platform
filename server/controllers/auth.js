import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("User already exsist");

    //hash password
    const hashedPassword=await hashPassword(password)

    //register
    const user= await new User({
        name,
        email,
        password:hashedPassword
    }).save();
    console.log("Saved user",user);
    return res.json({ok:true})

  } catch (error) {
    console.log(error);
    res.status(400).send("Error. Try again");
  }
};

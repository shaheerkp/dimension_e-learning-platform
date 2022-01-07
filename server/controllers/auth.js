import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log("register");
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

export const signin=async (req,res)=>{

  try { 
    const {email,password}=req.body
    const user=await User.findOne({email}).exec();
    if(!user) return res.status(400).send("No user found")
    const match=await comparePassword(password,user.password)
    console.log("try",password,user.password,match); 
    if (!match) return res.status(400).json({mes:"Invalid password"})
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRETE,{expiresIn:"7d",})


    user.password=undefined

    res.cookie("token",token,{
      httpOnly:true,
      // secure:true,
    })

    res.json(user)





    
  } catch (error) {
    res.status(400).json({msg:"Error.try again"})
  }



}

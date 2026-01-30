import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const signUp = async (req,res) => {
    try {

        const {name , email , password} = req.body;

        if(!name || !email || !password) {
            return res.json({
                success:false,
                message:"insufficient credentials"
            })
        }

        const existingUser = await User.find(email);
        if(existingUser){
            return res.json({
                success:false,
                message:"User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const createdUser = await User.create({
            name,
            email,
            password:hashedPassword
        })

        return res.json({

            success:true,
            message:"user created successfully",
            createdUser

        })
        
    } catch (error) {

        return res.json({
            success:false,
            message:error.message
        })
    }
}


export const login = async (req,res) => {
    try {
        
    } catch (error) {

        const {email , password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.json({
                success:false ,
                message:"Invalid cred"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password , user.password)

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn : "7d"}
        )

         res.json({
            success:true,
            token,
            user: {
                name: user.name,
                id:user._id,
                email:user.email
            }
         })

        return res.json({
            success:false,
            message:error.message
        })
        
    }
}

















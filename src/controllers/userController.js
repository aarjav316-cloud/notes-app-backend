import User from "../models/userSchema.js";

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




















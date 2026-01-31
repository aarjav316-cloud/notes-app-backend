import Note from "../models/Note.js";


export const createNote = async (req,res) => {
    try {

        const {title , content} = req.body;

        if(!title || !content){
            return res.json({
                success:false,
                message:"insufficient credentials"
            })
        }

        const createdNote = await Note.create({
            title,
            content,
            user:req.user._id
        })

        return res.json({
            success:true,
            message:"note created succcessfully",
            createNote
        })
        
    } catch (error) {
        return res.json({success:false , message:error.message})
    }
}

export const getNotes = async (req,res) => {
    try {

        const allNotes = await Note.find({
            user: req.user._id
        }).sort({
            createdAt: -1
        });

        return res.json({
            success:true,
            message:"your notes",
            allNotes
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}

export const updatedNotes = async(req,res) => {
    try {
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}
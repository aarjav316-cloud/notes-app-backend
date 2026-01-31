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

       const note = await Note.findById(req.params.id)

       if(!note){
        return res.json({
            success:false,
            message:"notes not found"
        })
       }

       if(note.user.toString() !== req.user._id.toString()){
           return res.json({success:false , message:"cannot update"})
       }

       note.title = req.body.title || note.title;
       note.content = req.body.content || note.content;

       const notesUpdate = await note.save();

       res.json({
        success:true,
        message:"notes updated successfully",
        notesUpdate
       })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}

export const deleteNotes = async (req,res) => {
    try {

        const note = await Note.findById(req.params.id)

        if(!note) {
            return res.json({
                success:false,
                message:"notes not found"
            })
        }

        if( note.user.toString() !== req.user._id.toString()){
            return res.json({
                success:false,
                message:"cannot edit this note"

            })
        }

        const noteDelete = note.deleteOne()

        return res.json({
            success:true,
            message:"notes deleted successfully"
        })
        
    } catch (error) {
        return res.json({
            success:false, 
            message: error.message
        })
    }
}



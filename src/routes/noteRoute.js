import express from 'express'
import { Router } from 'express'
import { createNote,
         deleteNotes,
         getNotes, 
         updatedNotes
    } from '../controllers/noteController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/" , protect, createNote)
router.get("/" ,  protect, getNotes)
router.put("/:id" , protect, updatedNotes)
router.delete("/:id" , protect, deleteNotes)

export default router;





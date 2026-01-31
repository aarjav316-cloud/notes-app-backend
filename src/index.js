import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import errorHandler from './middleware/errorMiddleware.js'

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

connectDb()

app.get('/' , (req,res) => {
    res.send("notes app backend running")
} )

app.use(errorHandler)


const PORT = process.env.PORT || 5000;


app.listen(PORT , () => {
    console.log(`server running on port ${PORT}`)
})





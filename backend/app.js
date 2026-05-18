import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
dotenv.config({
    path: "./.env"
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser)
app.use(cors())


export default app
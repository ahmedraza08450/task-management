import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { errorMiddleware } from './src/middlewares/errorMiddleware.js'

const app = express()
dotenv.config({
    path: "./.env"
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser)
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: process.env.FRONTEND
}))


app.use(errorMiddleware)
export default app
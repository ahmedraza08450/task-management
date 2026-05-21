import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { errorMiddleware } from './src/middlewares/errorMiddleware.js'
import userRoute from './src/routes/user.route.js'
import taskRoute from './src/routes/task.route.js'
import dns from 'dns'

dns.setServers(["1.1.1.1"])

const app = express()
dotenv.config({
    path: "./.env"
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: process.env.FRONTEND
}))

app.use("/api/v1/user", userRoute)
app.use("/api/v1/task", taskRoute)

app.get("/", (req, res) => {
    res.send("<h1>SERVER IS LISTENING</h1>")
})

app.use(errorMiddleware)
export default app
import express from 'express'
import { getUserDetails, login, logout, register } from '../controllers/user.controller.js'
import { isUserAuthenticated } from '../middlewares/auth.js'

const userRoute = express.Router()

userRoute.post("/register", register)
userRoute.post("/login", login)
userRoute.get("/logout", isUserAuthenticated, logout)
userRoute.get("/getUserDetails", isUserAuthenticated, getUserDetails)

export default userRoute
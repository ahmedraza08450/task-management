import express from 'express'
import { createTask, deleteTask, getMyTasks, getSingleTask, updateTask } from '../controllers/task.controller.js'
import { isUserAuthenticated } from '../middlewares/auth.js'

const taskRoute = express.Router()

taskRoute.post("/createTask", isUserAuthenticated, createTask)
taskRoute.get("/getMyTasks", isUserAuthenticated, getMyTasks)
taskRoute.put("/updateTask/:id", isUserAuthenticated, updateTask)
taskRoute.delete("/deleteTask/:id", isUserAuthenticated, deleteTask)
taskRoute.get("/getSingleTask/:id", isUserAuthenticated, getSingleTask)

export default taskRoute
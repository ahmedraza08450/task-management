import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../middlewares/errorMiddleware.js'
import { Task } from '../models/task.model.js'

const createTask = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body
    if (!title || !description) {
        return next(new ApiError("All fields are required!", 400))
    }
    const createdBy = req.user._id
    const task = await Task.create({
        title,
        description,
        createdBy
    })
    return res.status(201).json({
        success: true,
        message: "Task Created!"
    })
})

const getMyTasks = asyncHandler(async (req, res, next) => {
    const user = req.user._id;
    const task = await Task.find({ createdBy: user })
    res.status(200).json({
        success: true,
        task
    })
})
const updateTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    let task = await Task.findById(id)
    if (!task) {
        return next(new ApiError("Task not found!", 404))
    }
    task = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Task Updated",
        task
    })
})
const deleteTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
        return next(new ApiError("task not found!", 404))
    }

    await task.deleteOne()
    res.status(200).json({
        success: true,
        message: "Task deleted"
    })

})

const getSingleTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
        return next(new ApiError("task not found!", 404))
    }
    return res.status(200).json({ success: true, task })
})

export { createTask, getMyTasks, updateTask, deleteTask, getSingleTask }
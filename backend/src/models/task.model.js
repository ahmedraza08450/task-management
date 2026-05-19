import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        decription: {
            type: String
        },
        status: {
            type: String,
            enum: ["incomplete", "complete"],
            default: "incomplete"
        },
        archived: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            required: true
        }
    }
)
export const Task = mongoose.model("Task", taskSchema)
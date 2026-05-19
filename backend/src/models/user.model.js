import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First name must contains atleast 3 characters"]
        },
        lastName: {
            type: String,
            required: true,
            minLength: [3, "Last name must contains atleast 3 characters"]
        },
        email: {
            type: String,
            required: true,
            validate: [validator.isEmail, "Please provide A valid Email"]
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password must contains at least 8 digits"]
        }
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    )
}


export const User = mongoose.model("User", userSchema)
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../middlewares/errorMiddleware.js'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'


const isUserAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.userCookie
    if (!token) {
        return next(new ApiError("User Is Not Authenticated", 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    next()
})
export { isUserAuthenticated }
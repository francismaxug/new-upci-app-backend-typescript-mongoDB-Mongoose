import jwt from "jsonwebtoken"
import UserAdmin from "../models/adminModel"
import { catchAsync } from "../utils/catchAsync"
import AppError from "../utils/appError"
import { Request, Response, NextFunction } from "express"
import { IUserSchema } from "../types/admin"

declare module "express-serve-static-core" {
  interface Request {
    user: IUserSchema
  }
}
const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req)
    let token

    token = req.cookies.session
    // console.log(token)

    if (!token) return next(new AppError("no token found", 404))

    const decodeUser = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload
    console.log(decodeUser)
    if (!decodeUser) return next(new AppError("invalid token", 404))

    const currentUser = await UserAdmin.findById(decodeUser.user._id).select(
      "-password"
    )
    // console.log(currentUser)
    if (!currentUser) return next(new AppError("user not found", 404))
    req.user = currentUser
    next()
  }
)

export { protect }

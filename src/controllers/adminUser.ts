import UserAdmin from "../models/adminModel"
import AppError from "../utils/appError"
import { catchAsync } from "../utils/catchAsync"
import { Request, Response, NextFunction } from "express"

// import getToken from "../utils/token.js"

const adminLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req)
    const { adminID, password } = req.body
    console.log(adminID, password)

    const user = await UserAdmin.findOne({ adminID })
    if (!user) return next(new AppError("Invalid Credentials", 404))
    const checkPassword = await user.comparePasswords(password)
    if (!checkPassword) return next(new AppError("Invalid Credentials", 404))

    //continue with execution
    // getToken(user, res)
    res.status(200).json({
      status: "success",
      message: "Login Successful",
      user: {
        _id: user._id,
        isMainAdmin: user.isMainAdmin,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        email: user.email,
        isSubmitFullDetails: user.isSubmitFullDetails
      }
    })
    // console.log(user)
  }
)

const getCurrentAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      user: {
        isMainAdmin: req.user.isMainAdmin,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        profileImage: req.user.profileImage,
        email: req.user.email
      }
    })
  }
)

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("jwt", "", {
      expires: new Date(0)
    })
    res.status(200).json({
      status: "success",
      message: "Logout Successful"
    })
  }
)
export { adminLogin, logout, getCurrentAdmin }

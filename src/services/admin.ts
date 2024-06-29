import cloudinary from "../config/cloudinary"
import {
  IAdminEditProfileInfo,
  IAdminLogin,
  IUserAdmin,
  IUserAdminModel,
  IUserLoginSucces,
  IUserProfileCompleteInfo
} from "../types/admin"
import { IAppContext, InitAdmin } from "../types/app"
import createError from "../utils/appError"

export class AdminServices extends InitAdmin {
  constructor(context: IAppContext) {
    super(context)
  }

  login = async (input: IAdminLogin) => {
    try {
      const user = await this.queryDB.adminModel.findOne({
        adminID: input.adminID
      })
      if (!user) throw createError("Invalid Credentials", 404)
      const checkPassword = await user.comparePasswords(input.password)
      if (!checkPassword) throw createError("Invalid Credentials", 404)

      const authAdmin: IUserLoginSucces = {
        status: "success",
        message: "Login Successful",
        user: {
          _id: user._id,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
          email: user.email,
          isSubmitFullDetails: user.isSubmitFullDetails
        }
      }
      return authAdmin
    } catch (err) {
      throw err
    }
  }
  completeRegistration = async (input: IUserProfileCompleteInfo) => {
    try {
      await this.queryDB.adminModel.findByIdAndUpdate(
        input._id,
        {
          email: input.email,
          country: input.country,
          region: input.region,
          placeOfResidence: input.placeOfResidence,
          phoneNumber: input.phoneNumber,
          position: input.position,
          isSubmitFullDetails: true
        },
        { new: true }
      )

      return {
        status: "success",
        message: "Registration Successful"
      }
    } catch (err) {
      throw err
    }
  }

  adminUpdateProfile = async (input: IAdminEditProfileInfo) => {
    try {
      const admin = await this.queryDB.adminModel.findByIdAndUpdate(
        input._id,
        {
          email: input.email,
          country: input.country,
          region: input.region,
          placeOfResidence: input.placeOfResidence,
          phoneNumber: input.phoneNumber,
          zipCode: input.zipCode,
          address: input.address,
          languages: input.languages,
          profileImage: input.profileImage,
          firstName: input.firstName,
          lastName: input.lastName,
          cloudianryPublicId: input.cloudianryPublicId
        },
        { new: true }
      )

      return admin
    } catch (err) {
      throw err
    }
  }
}

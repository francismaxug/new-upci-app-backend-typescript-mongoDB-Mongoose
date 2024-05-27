import {
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
          isMainAdmin: user.isMainAdmin,
          isSuperAdmin: user.isSuperAdmin,
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
  completeRegistration= async(input:IUserProfileCompleteInfo) => {
    try {
      const user = await this.queryDB.adminModel.findByIdAndUpdate({})
      }catch (err) {
        throw err
      }
  
}

}
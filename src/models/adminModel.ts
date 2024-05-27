import pkg from "mongoose"
const { Schema, model, models, SchemaTypes } = pkg
import bcrypt from "bcryptjs"
import { IUserAdminModel, IUserSchema } from "../types/admin"
const userAdminSchema = new Schema<IUserSchema>(
  {
    isAdmin: {
      type: Boolean,
      default: true
    },
    isMainAdmin: {
      type: Boolean,
      default: false
    },
    isSuperAdmin: {
      type: Boolean,
      default: false
    },
    adminID: {
      type: String,
      unique: true,
      required: [true, "Admin ID is required"]
    },
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: ""
    },
    region: {
      type: String,
      default: ""
    },
    placeOfResidence: {
      type: String,
      default: ""
    },
    phoneNumber: {
      type: String,
      default: ""
    },

    password: {
      type: String,
      required: [true, "Password is required"]
    },
    position:{
      enum:["Head Pastor","Deacon", "Admin", "Acountant / Finance", "Ministry Leader"],
      type:String,
      default:"Admin"
    },

    isSubmitFullDetails: {
      type: Boolean,
      default: false
    },
    profileImage: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
)

userAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    const hashs = await bcrypt.hash(this.password, salt)
    this.password = hashs
    return
  } catch (error) {
    console.log(error)
  }
})

//compaere passwords
userAdminSchema.methods.comparePasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

const UserAdmin = models.UserAdmin || model<IUserSchema, IUserAdminModel>("UserAdmin", userAdminSchema)
export default UserAdmin

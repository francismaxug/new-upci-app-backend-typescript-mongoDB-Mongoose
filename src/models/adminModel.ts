import pkg from "mongoose"
const { Schema, model, models, SchemaTypes } = pkg
import bcrypt from "bcryptjs"
import { IUserAdminModel, IUserSchema } from "../types/admin"
const userAdminSchema = new Schema<IUserSchema>(
  {
    adminID: {
      type: String,
      unique: true,
      required: [true, "Admin ID is required"]
    },
    role: {
      type: String,
      enum: ["User", "AppAdmin", "AppSuperAdmin"],
      default: "User"
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
    address: {
      type: String,
      default: ""
    },
    zipCode: {
      type: String,
      default: ""
    },
    cloudianryPublicId: {
      type: String,
      default: ""
    },
    languages: {
      type: [String],
      default: []
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    position: {
      enum: [
        "Head Pastor",
        "Deacon",
        "Admin",
        "Acountant / Finance",
        "Ministry Leader"
      ],
      type: String,
      default: "Head Pastor"
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

const UserAdmin =
  models.UserAdmin ||
  model<IUserSchema, IUserAdminModel>("UserAdmin", userAdminSchema)
export default UserAdmin

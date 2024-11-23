import mongoose from "mongoose"
import dotenv from "dotenv"
import { Config } from "../config/serve"
import { IInitDB } from "./initalize"
import UserAdmin from "./adminModel"
import UserLocation from "./geolocationModel"
import ResetCode from "./codeModel"
dotenv.config()
let connected = false
const connectDB = async (db: Config["dbString"]): Promise<IInitDB> => {
  try {
    await mongoose.connect(db.uri || "")
    connected = true

    await UserAdmin.createCollection()
    console.log(`MongoDB Connected`)

    return {
      adminModel: UserAdmin,
      geolocation: UserLocation,
      code: ResetCode
    }
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`)
    process.exit(1)
  }
}

export default connectDB

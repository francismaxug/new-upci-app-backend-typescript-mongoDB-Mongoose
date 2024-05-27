import mongoose from "mongoose"
import dotenv from "dotenv"
import { Config } from "../config/serve"
dotenv.config()
let connected = false
const connectDB = async (db:Config["dbString"]) => {
  if (connected) {
    console.log("Already connected to MongoDB")
    return
  }
  try {
    await mongoose.connect(db.uri || "")
    connected = true
    console.log(`MongoDB Connected`)
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`)
    process.exit(1)
  }
}

export default connectDB

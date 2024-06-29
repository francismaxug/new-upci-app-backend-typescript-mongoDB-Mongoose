import bcrypt from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

const int = parseInt(process.env.HASH_NUMBER!)

const admin = [
  {
    adminID: process.env.ADMIN_ID_1,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD!, int),
    role: process.env.ADMIN_1_ROLE || "",
    firstName: process.env.MAIN_ADMIN_FIRST_NAME || "",
    lastName: process.env.MAIN_ADMIN_LAST_NAME || ""
  },
  {
    adminID: process.env.ADMIN_ID_2,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD!, int),
    firstName: process.env.FIRST_ADMIN_FIRST_NAME || "",
    lastName: process.env.FIRST_ADMIN_LAST_NAME || ""
  },
  {
    adminID: process.env.ADMIN_ID_3,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD!, int),
    firstName: process.env.SECOND_ADMIN_FIRST_NAME || "",
    lastName: process.env.SECOND_ADMIN_LAST_NAME || ""
  },

  {
    adminID: process.env.ADMIN_ID_4,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD!, int),
    role: process.env.ADMIN_4_ROLE || "",
    firstName: process.env.SUPER_ADMIN_FIRST_NAME || "",
    lastName: process.env.SUPER_ADMIN_LAST_NAME || ""
  }
]

export default admin

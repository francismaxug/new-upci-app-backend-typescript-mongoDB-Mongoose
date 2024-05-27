import bcrypt from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

const int = parseInt(process.env.HASH_NUMBER!)
const isAdmin = Boolean(process.env.IS_ADMIN)
const isMainAdmin = Boolean(process.env.IS_MAIN_ADMIN)
const isSuperAdmin = Boolean(process.env.IS_SUPER_ADMIN)
const admin = [
  {
    adminID: process.env.ADMIN_ID_1,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD!, int),
    isAdmin: isAdmin,
    isMainAdmin: isMainAdmin,
    firstName: process.env.MAIN_ADMIN_FIRST_NAME || "",
    lastName: process.env.MAIN_ADMIN_LAST_NAME || ""
  },
  {
    adminID: process.env.ADMIN_ID_2,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD!, int),
    isAdmin: isAdmin,
    firstName: process.env.FIRST_ADMIN_FIRST_NAME || "",
    lastName: process.env.FIRST_ADMIN_LAST_NAME || ""
  },
  {
    adminID: process.env.ADMIN_ID_3,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD!, int),
    isAdmin: isAdmin,
    firstName: process.env.SECOND_ADMIN_FIRST_NAME || "",
    lastName: process.env.SECOND_ADMIN_LAST_NAME || ""
  },

  {
    adminID: process.env.ADMIN_ID_4,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD!, int),
    isAdmin: isAdmin,
    firstName: process.env.SUPER_ADMIN_FIRST_NAME || "",
    lastName: process.env.SUPER_ADMIN_LAST_NAME || "",
    isSuperAdmin: isSuperAdmin
  }
]

export default admin

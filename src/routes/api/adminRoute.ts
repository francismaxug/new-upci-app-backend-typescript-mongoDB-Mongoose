import {
  adminLogin,
  logout,
  getCurrentAdmin
} from "../../controllers/adminUser"
import express from "express"
import { protect } from "../../middleware/auth"
const router = express.Router()

router.post("/login", adminLogin)
router.get("/logout", logout)
router.get("/getCurrentAdmin", protect, getCurrentAdmin)

export default router

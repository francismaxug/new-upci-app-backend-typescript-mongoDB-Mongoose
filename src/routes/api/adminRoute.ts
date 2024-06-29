import {
  adminLogin,
  completeRegistration,
  getCurrentAdmin,
  getAdminProfileInfo,
  adminUpdateProfile
} from "../../controllers/adminUser"
import express from "express"
import { protect } from "../../middleware/auth"
const router = express.Router()

router.post("/login", adminLogin)
router.patch("/complete-registration", protect, completeRegistration)
// router.get("/logout", logout)
router.get("/getCurrentAdmin", protect, getCurrentAdmin)
router.get("/admin/profileInfo", protect, getAdminProfileInfo)
router.patch("/admin/updateprofile", protect, adminUpdateProfile)

export default router

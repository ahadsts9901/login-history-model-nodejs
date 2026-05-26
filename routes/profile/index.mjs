import { Router } from "express"
import {
    getLoginHistoryController, getMyProfileController,
    globalSignoutcontroller, logoutController
} from "../../controllers/index.mjs"
import { getProfileMiddleware } from "../../middlewares/index.mjs"
import { errorMessages } from "../../utils/errorMessages.mjs"

const router = Router()

router.post("/logout", logoutController)
router.get("/profile", getMyProfileController, getProfileMiddleware, (req, res) => res.send({ message: errorMessages?.profileFetched, data: req?.userData }))

router.get("/login-history", getLoginHistoryController)
router.post("/global-signout", globalSignoutcontroller)

export default router

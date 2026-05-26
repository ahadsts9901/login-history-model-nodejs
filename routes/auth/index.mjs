import { Router } from "express"
import { emailLoginController } from "../../controllers/index.mjs"
import { issueLoginToken } from "../../middlewares/index.mjs"

const router = Router()

router.post("/email-login", emailLoginController, issueLoginToken, (req, res) => res.send({ message: "email login successfull", data: req?.loginTokenPayload, token: req.hart }))

export default router

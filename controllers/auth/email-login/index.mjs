import { errorMessages } from "../../../utils/errorMessages.mjs";
import { userModel, loginHistoryModel } from "../../../models/index.mjs"
import bcrypt from "bcrypt"

export const emailLoginController = async (req, res, next) => {
    try {
        const { email, password: reqPassword } = req.body;

        if (!email) {
            return res.status(400).send({
                message: errorMessages?.emailRequired
            });
        }

        if (!reqPassword) {
            return res.status(400).send({
                message: errorMessages?.passwordRequired
            });
        }

        const user = await userModel.findOne({ email: email?.toLowerCase(), isDeleted: false }).exec();
        if (!user) {
            return res.status(400).send({
                message: errorMessages?.emailPasswordIncorrect
            });
        }
        
        const isPasswordTrue = await bcrypt.compare(reqPassword, user.password);
        if (!isPasswordTrue) {
            await loginHistoryModel.create({
                loginStatus: "INVALID_PASSWORD",
                source: "EMAIL"
            })
            return res.status(400).send({
                message: errorMessages?.emailPasswordIncorrect
            });
        }

        const { password, ...userData } = user?.toObject()
        req.loginTokenPayload = userData
        req.source = "EMAIL"
        next()

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        });
    }
};
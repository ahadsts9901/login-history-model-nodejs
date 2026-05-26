import { isValidObjectId } from "mongoose";
import { errorMessages } from "../../utils/errorMessages.mjs";
import { userModel } from "../../models/index.mjs"

export const getProfileMiddleware = async (req, res, next) => {
    try {
        const { userId } = req

        if (!userId || userId?.trim() === "") {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        if (!isValidObjectId(userId)) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const user = await userModel.findById(userId)
            .exec()

        if (!user || user?.isDeleted) {
            return res.status(404).send({
                message: errorMessages?.noAccountFound
            })
        }

        const { password, ...userData } = user.toObject()
        req.userData = userData
        next()

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        });
    }
}

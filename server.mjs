import "dotenv/config"
import "./libs/db.mjs"
import express, { json } from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import { allowedOrigins, corsOptions } from "./utils/core.mjs"
import { authenticationMiddleware } from "./middlewares/index.mjs"
import { authRoutes, profileRoutes } from "./routes/index.mjs"
import { seedUser } from "./utils/seed.mjs"

const app = express()

app.set('trust proxy', true);
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(json())
app.use(cookieParser())

seedUser()

app.get("/", (req, res) => res.send("Hello from developer"))

app.use("/api/v1",
    authRoutes,
    authenticationMiddleware,
    profileRoutes,
)

const PORT = process.env.PORT || 5002
app.listen(PORT, () => console.log(`server running on port ${PORT}`))

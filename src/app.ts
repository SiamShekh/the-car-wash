import express, { Application } from "express";
import cors from "cors";
import _ENV from "./config/config";
import GlobalErrorHandler from "./middlewars/GlobalErrorHandler";
import { GetAvilableSlot } from "./module/slot/slot.controller";
import route from "./route/route";

const app: Application = express();
app.use(express.json());
app.use(cors({
    origin: [
        "*",
        "http://localhost:5173",
        "https://carwisho-ltd.vercel.app",
        "http://localhost:4173"
    ]
}));

app.use("/api", route);
app.use(GlobalErrorHandler)

app.get('/', (req, res) => {
    res.send('Hello World!')
})


export default app;
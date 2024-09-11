import express, { Application } from "express";
import cors from "cors";
const app: Application = express();
import _ENV from "./config/config";
import GlobalErrorHandler from "./middlewars/GlobalErrorHandler";
import { GetAvilableSlot } from "./module/slot/slot.controller";
import route from "./route/route";

app.use(cors({
    origin: 'https://carwisho-ltd.vercel.app',
}));

app.use(express.json());
app.use("/api", route);
app.use(GlobalErrorHandler);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

export default app;

import express, { Application } from "express";
import cors from "cors";
import _ENV from "./config/config";
import GlobalErrorHandler from "./middlewars/GlobalErrorHandler";
import { GetAvilableSlot } from "./module/slot/slot.controller";
import route from "./route/route";

const app: Application = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use("/api", route);
app.use(GlobalErrorHandler)

app.get('/', (req, res) => {
    res.send('Hello World!')
})


export default app;
import Express from "express";
import { InitiatePayment, SuccessPayment } from "../module/payment/payment.controller";

const route = Express.Router();

route.post("/payment/initiate-pay", InitiatePayment);
route.post("/payment/confirmission", SuccessPayment);

const PaymentRoute = route;
export default PaymentRoute;
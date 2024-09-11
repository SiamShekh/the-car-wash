import { Request, Response } from "express";
import catchAsync from "../../middlewars/catchAsync";
import responseData from "../../middlewars/responseData";
import httpStatus from "http-status";
import axios from "axios";
import mongoose from "mongoose";
import { UserModel } from "../user/user.model";
import { SlotModel } from "../slot/slot.model";
import { PaymentModel } from "./payment.schema";
import { ServiceModel } from "../service/service.model";
import { join } from "path";
import { readFileSync } from "fs";
import { BookingModel } from "../booking/booking.model";

export const SuccessPayment = catchAsync(async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    let transactionCommitted = false;
    const transaction = req?.query?.tran;
    try {
        session.startTransaction();

        const PaymentInfo = await PaymentModel.findOne({ trans: transaction }, {}, { session });

        const search_transaction = await axios.get("https://sandbox.aamarpay.com/api/v1/trxcheck/request.php", {
            params: {
                store_id: "aamarpaytest",
                signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
                request_id: PaymentInfo?.trans,
                type: "json"
            }
        });

        if (search_transaction?.data?.pay_status === 'Successful') {
            const Slot = await SlotModel.findById(PaymentInfo?.slot, {}, { session });
            console.log(Slot);

            await BookingModel.create([{
                customerId: PaymentInfo?.user,
                serviceId: Slot?.service,
                slotId: Slot?._id,
                vehicleType: PaymentInfo?.vehicleType,
                vehicleBrand: PaymentInfo?.vehicleBrand,
                vehicleModel: PaymentInfo?.vehicleModel,
                manufacturingYear: PaymentInfo?.manufacturingYear,
                registrationPlate: PaymentInfo?.registrationPlate,
            }], { session })
            await SlotModel.findByIdAndUpdate(PaymentInfo?.slot, { isBooked: "booked" }, { session });
        }

        await session.commitTransaction();
        transactionCommitted = true;
        await session.endSession();

        // const file_location = join(__dirname, "../../view/confirmission.html");
        // let template = readFileSync(file_location, "utf-8");
        const file_location = join(process.cwd(), "view", "confirmission.html");
        let template = readFileSync(file_location, "utf-8");
        
        template = template.replace(`{{status}}`, search_transaction?.data?.pay_status);
        template = template.replace(`{{{link-back}}}`, 'https://carwisho-ltd.vercel.app/dashboard');
        return res.send(template);
    } catch (error: any) {
        if (transactionCommitted === false) {
            await session.abortTransaction();
        }

        await session.endSession();
        // const file_location = join(__dirname, "../../view/confirmission.html");
        const file_location = join(process.cwd(), "view", "confirmission.html");
        let template = readFileSync(file_location, "utf-8");
        // let template = readFileSync(file_location, "utf-8");
        template = template.replace(`{{status}}`, 'Faild!');
        template = template.replace(`{{{link-back}}}`, 'https://carwisho-ltd.vercel.app/service');
        return res.send(template);
    }
});

export const InitiatePayment = catchAsync(async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    let transactionCommitted = false;
    try {
        session.startTransaction();

        const User = await UserModel.findById(req?.body?.user, {}, { session });
        const Slot = await SlotModel.findById(req?.body?.slot, {}, { session });
        const Service = await ServiceModel.findById(Slot?.service, {}, { session });
        const tran_id = new Date().getTime();

        const initiate_payment_aamerpay = await axios.post("https://sandbox.aamarpay.com/jsonpost.php", {
            store_id: "aamarpaytest",
            tran_id: tran_id,
            signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
            success_url: `https://carwashio.vercel.app/api/payment/confirmission?tran=${tran_id}`,
            fail_url: `https://carwashio.vercel.app/api/payment/confirmission?tran=${tran_id}`,
            cancel_url: "https://carwisho-ltd.vercel.app/service",
            amount: Service?.price,
            currency: "BDT",
            desc: User?.name + " is requesting a new slot...",
            cus_name: User?.name,
            cus_email: User?.email,
            cus_add1: User?.address,
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "N/A",
            cus_country: "N/A",
            cus_phone: User?.phone,
            "type": "json"
        });

        await PaymentModel.create([
            {
                ...req?.body,
                trans: tran_id,
                status: false
            }
        ], { session })

        await session.commitTransaction();
        transactionCommitted = true;
        await session.endSession();

        console.log(initiate_payment_aamerpay.data);

        return res.send(responseData(true, httpStatus.OK, "Payment Initiated...", initiate_payment_aamerpay.data));
    } catch (error: any) {
        if (!transactionCommitted) {
            // Only abort the transaction if it wasn't committed
            await session.abortTransaction();
        }
        await session.endSession();
        console.error(error); // Log the error for debugging
        return res.send(responseData(false, httpStatus.INTERNAL_SERVER_ERROR, "Failed to initiate payment!", []));
    }
});

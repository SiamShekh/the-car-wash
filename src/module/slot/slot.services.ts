import { ServiceModel } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";

export const CreateSlot_Service = async (payload: TSlot) => {

    const findServices = await ServiceModel.findById(payload.service);

    const calculateStartTime = Number(payload?.startTime?.split(':')[0]) * 60 + Number(payload?.startTime?.split(':')[1]);
    const calculateEndTime = Number(payload?.endTime?.split(':')[0]) * 60 + Number(payload?.endTime?.split(':')[1]);
    const calculateSlots = Math.floor((calculateEndTime - calculateStartTime) / Number(findServices?.duration || 0));

    const SlotArr = [];
    let SlotStart = calculateStartTime;

    for (let index = 0; index < calculateSlots; index++) {
        const SlotEnd = SlotStart + Number(findServices?.duration);

        const Slot = {
            "service": payload?.service,
            "date": payload?.date,
            "startTime": `${String(Math.floor(SlotStart / 60)).padStart(2, '0')}:${String(SlotStart % 60).padStart(2, '0')}`,
            "endTime": `${String(Math.floor(SlotEnd / 60)).padStart(2, '0')}:${String(SlotEnd % 60).padStart(2, '0')}`,
            "isBooked": "available",
        };


        const result = await SlotModel.create(Slot);
        SlotArr.push(result);
        SlotStart = SlotEnd;
    }

    return SlotArr;
}

export const GetAvilableSlots = async (query: any) => {
    const result = SlotModel
        .find({ $or: [{ date: query?.date }, { service: query?.serviceId }, {}] })
        .populate('service')

    return result;
}
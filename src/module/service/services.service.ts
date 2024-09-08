import mongoose from "mongoose";
import { TPayloadService, TService } from "./service.interface";
import { ServiceModel } from "./service.model";

export const CreateService_Service = async (payload: TService) => {
    const result = await ServiceModel.create(payload);
    return result;
}


export const GetSingleDataByID = async (id: string) => {
    const result = await ServiceModel.findById(id);
    return result;
}

export const GetAllService_Service = async (payload: Partial<TPayloadService>) => {

    const result = await ServiceModel
        .find({
            ...(payload?.searchTerm && { name: { $regex: payload.searchTerm, $options: 'i' } }),
            ...(payload?.maxPrice && payload?.minPrice && { price: { $gte: payload.minPrice, $lte: payload.maxPrice }})
        })
    return result;
}

export const UpdateService_Service = async (id: string, payload: Partial<TService>) => {
    const result = await ServiceModel.findByIdAndUpdate(id, { $set: { ...payload } });
    const findUpdate = await ServiceModel.findById(result?._id);
    return findUpdate;
}

export const DeleteService_Service = async (id: string) => {
    const result = await ServiceModel.findByIdAndUpdate(id, { $set: { isDeleted: true } });
    const findUpdate = await ServiceModel.findById(result?._id);
    return findUpdate;
}
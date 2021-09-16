import { Document } from "mongoose";

export interface VehicleInterface extends Document{
    Label: string,
    Value: number
}
import { Document } from "mongoose";

export interface BrandInterface extends Document{
    Label: string,
    Value: number
}
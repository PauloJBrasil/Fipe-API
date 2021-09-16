import { Document } from "mongoose";

export interface YearInterface extends Document{
    Label: string,
    Value: string
}
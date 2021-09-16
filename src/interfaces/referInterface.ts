import { Document } from "mongoose";

export interface ReferInterface extends Document{
    Codigo: number,
    Mes: string
}
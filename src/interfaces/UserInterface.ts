import { Document } from "mongoose";

export interface UserInterface extends Document{
    email: string,
    password: string,
}
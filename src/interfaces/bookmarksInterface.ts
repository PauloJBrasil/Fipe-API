import { Document } from "mongoose";

export interface BookmarksInterface extends Document{
    _id: object;
    email: string,
    Valor: string,
    Combustivel: string,
    Marca: string,
    Modelo: string,
    AnoModelo: number,
    TipoVeiculo: number,
    SiglaCombustivel: string
}
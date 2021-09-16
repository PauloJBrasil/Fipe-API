import { Document } from "mongoose";

export interface AllDataInterface extends Document{
    Valor: string,
    Marca: string,
    Modelo: string,
    AnoModelo: number,
    Combustivel: string,
    CodigoFipe: string,
    MesReferencia: string,
    Autenticacao: string,
    TipoVeiculo: string,
    SiglaCombustivel: string,
    DataConsulta: string
}
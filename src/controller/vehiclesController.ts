import { NextFunction, Request, Response} from 'express';
import axios from 'axios';
import { VehicleInterface } from '../interfaces/vehicleInterface';
import Vehicle from '../models/Vehicle';
import vehicles_dto from '../DTO/vehicle_dto';
import refersController from './refersController';
import year_dto from '../DTO/year_dto';
import allData_dto from '../DTO/allData_dto';

const findModel = (req: Request, response: Response, next: NextFunction) => {
    let { brandCode, vehicleType, codeMonth } = req.body

    axios.request({
        method: 'POST',
        url: 'http://veiculos.fipe.org.br/api/veiculos/ConsultarModelos',
        headers: {
            'Host': 'veiculos.fipe.org.br',
            'Referer': 'http://veiculos.fipe.org.br',
            'Content-Type': 'application/json'
        },
        data: {
            "codigoTabelaReferencia": codeMonth,
            "codigoTipoVeiculo": vehicleType,
            "codigoMarca": brandCode
        }
    }).then((res) => {
        return response.status(200).json(vehicles_dto.renderMany(res.data.Modelos))
    }).catch((error) => {
        return response.status(500).json({
            message: error.message,
            error
        })
    })
}

const findModelYear = (req: Request, response: Response, next: NextFunction) => {
    let { brandCode, vehicleType, codeMonth, modelCode } = req.body

    axios.request({
        method: 'POST',
        url: 'http://veiculos.fipe.org.br/api/veiculos/ConsultarAnoModelo',
        headers: {
            'Host': 'veiculos.fipe.org.br',
            'Referer': 'http://veiculos.fipe.org.br',
            'Content-Type': 'application/json'
        },
        data: {
            "codigoTabelaReferencia": codeMonth,
            "codigoTipoVeiculo": vehicleType,
            "codigoMarca": brandCode,
            "codigoModelo": modelCode
        }
    }).then((res) => {
        return response.status(200).json(year_dto.renderMany(res.data))
    }).catch((error) => {
        return response.status(500).json({
            message: error.message,
            error
        })
    })
}

const allDataAboutTheVehicle = (req: Request, response: Response, next: NextFunction) => {
    let { brandCode, vehicleType, codeMonth, modelCode, year } = req.body
    let onlyYear = year.toString().split('-')
    
    axios.request({
        method: 'POST',
        url: 'http://veiculos.fipe.org.br/api/veiculos/ConsultarValorComTodosParametros',
        headers: {
            'Host': 'veiculos.fipe.org.br',
            'Referer': 'http://veiculos.fipe.org.br',
            'Content-Type': 'application/json'
        },
        data: {
            "codigoTabelaReferencia": codeMonth,
            "codigoTipoVeiculo": vehicleType,
            "codigoMarca": brandCode,
            "ano": year,
            "codigoTipoCombustivel": 1,
            "anoModelo": onlyYear[0],
            "codigoModelo": modelCode,
            "tipoConsulta": "tradicional"
        }
    }).then((res) => {
        return response.status(200).json(allData_dto.render(res.data))
    }).catch((error) => {
        return response.status(500).json({
            message: error.message,
            error
        })
    })
}

export default { findModel, findModelYear, allDataAboutTheVehicle}

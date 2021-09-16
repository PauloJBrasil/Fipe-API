import { NextFunction, Request, Response} from 'express';
import refer_dto from '../DTO/refer_dto';
import mongoose from 'mongoose';
import Refer from '../models/Refer';
import axios from 'axios';

let mesLista = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
let mesAtual = mesLista[new Date().getMonth()]
let anoAtual = new Date().getFullYear()
let mesAno = mesAtual + '/' + anoAtual + ' ';


/** Função assíncrona que verifica se existe Documentos de Referencia **/
const verifyAndCreate = (req: Request, response: Response, next: NextFunction) => {

    Refer.find({ Mes: mesAno })
    .exec()
    .then(r => {
        /** Caso não encontre será criado **/ 
        if(r.length !== 1){
            /** 
             *  Requisição para API FIPE
             *  Consulta Tabela de Referência 
            **/ 
            axios.request({
                method: 'POST',
                url: 'http://veiculos.fipe.org.br/api/veiculos/ConsultarTabelaDeReferencia',
                headers: {
                    'Host': 'veiculos.fipe.org.br',
                    'Referer': 'http://veiculos.fipe.org.br',
                    'Content-Type': 'application/json'
                },
            }).then((res) => {

                let c = res.data.filter(f=>f.Mes === mesAno)
                
                const _refer = new Refer({
                    _id: new mongoose.Types.ObjectId(),
                    Codigo: c[0].Codigo,
                    Mes: c[0].Mes
                })

                _refer.save()
                .then(refer => {
                    return response.status(201).json({
                        message: 'Código do mês de ' + mesAtual + ' foi persistido no banco!!',
                        refer
                    })
                })
                .catch(error => {
                    return response.status(500).json({
                        message: error.message,
                        error
                    })
                })
            }).catch((error) => {
                return response.status(500).json({
                    message: error.message,
                    error
                })
            })
        } else {
            return response.status(200).json({
                message: 'Código de referência do mês já existe no banco!',
                code: 200
            })
        }
    })
}

/** Função assíncrona busca todos códigos de Referência **/
const find = (req: Request, res: Response, next: NextFunction) => {
    Refer.find()
    .exec()
    .then(f => {
        if(f.length < 1){
            return res.status(401).json({
                message: 'Código de referência não encontrado!'
            });
        }

        return res.status(200).json(refer_dto.renderMany(f))
    }).catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const findActualMonth = (req: Request, response: Response, next: NextFunction) => {

    Refer.findOne({ Mes: mesAno })
    .exec()
    .then(f => {
        
        if(!f){
            return response.status(401).json({
                message: 'Código de referência não encontrado!'
            });
        }
        return response.status(200).json(refer_dto.render(f))

    }).catch((error) => {
        return response.status(500).json({
            message: error.message,
            error
        });
    })
}


export default { verifyAndCreate, find, findActualMonth }

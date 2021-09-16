import { NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import { listenerCount } from 'process';
import bookmark_dto from '../DTO/bookmark_dto';
import Bookmark from '../models/Bookmark';

const create = (req: Request, res: Response, next: NextFunction) => {
    const { email, 
        Valor, 
        Marca, 
        Modelo, 
        AnoModelo, 
        Combustivel, 
        TipoVeiculo, 
        SiglaCombustivel, 
        DataConsulta } = req.body

        Bookmark.find({ 
            email, 
            Valor, 
            Marca, 
            Modelo, 
            AnoModelo, 
            Combustivel, 
            TipoVeiculo, 
            SiglaCombustivel, 
            DataConsulta 
        })
        .exec()
        .then(bookmark => {
            if (bookmark.length !== 0){
                return res.status(200).json({
                    message: 'Este veículo já está favoritado!'
                });
            }

            const _bookmarks = new Bookmark({
                _id: new mongoose.Types.ObjectId(),
                email,
                Valor, 
                Marca, 
                Modelo, 
                AnoModelo, 
                Combustivel, 
                TipoVeiculo, 
                SiglaCombustivel, 
                DataConsulta
            })

            return _bookmarks.save()
            .then(bookmark => {
                return res.status(201).json({
                    message: 'Salvo como favorito!',
                    bookmark
                })
            })
            .catch(error => {
                return res.status(500).json({
                    message: error.message,
                    error
            })

        }).catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
    });
}

const list = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    Bookmark.find({ email })
    .exec()
    .then(bookmark => {
        if (bookmark.length !== 1){
            return res.status(401).json({
                message: 'No favorite vehicles!'
            });
        }

        return res.status(200).json(bookmark_dto.renderMany(bookmark));

    }).catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const remove = (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    Bookmark.remove({ _id })
    .exec()
    .then(r => {
        if(r.deletedCount === 1){
            return res.status(200).json({
                message: 'Veículo removido dos favoritos',
                code: 200
            })
        }

        return res.status(404).json({
            message: 'Não foi encontrado favorito com este código',
            code: 404
        })
    }).catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })

}

export default { create, list, remove }
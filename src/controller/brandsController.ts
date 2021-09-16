import { NextFunction, Request, Response} from 'express';
import axios from 'axios';
import brand_dto from '../DTO/brand_dto';

const find = (req: Request, response: Response, next: NextFunction) => {
    let { vehicleType, codeMonth } = req.body
    
    axios.request({
        method: 'POST',
        url: 'http://veiculos.fipe.org.br/api/veiculos/ConsultarMarcas',
        headers: {
            'Host': 'veiculos.fipe.org.br',
            'Referer': 'http://veiculos.fipe.org.br',
            'Content-Type': 'application/json'
        },
        data: {
            "codigoTabelaReferencia": codeMonth,
            "codigoTipoVeiculo": vehicleType
        }
    }).then((res) => {
        return response.status(200).json(brand_dto.renderMany(res.data))
    }).catch((error) => {
        return response.status(500).json({
            message: error.message,
            error
        })
    })
}

export default { find }
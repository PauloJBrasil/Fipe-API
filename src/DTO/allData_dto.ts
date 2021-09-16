import { AllDataInterface } from "../interfaces/allDataInterface"

export default {
    render(data: AllDataInterface) {
        return {
            Valor: data.Valor,
            Combustivel: data.Combustivel,
            Marca: data.Marca,
            Modelo: data.Modelo,
            AnoModelo: data.AnoModelo,
            TipoVeiculo: data.TipoVeiculo,
            SiglaCombustivel: data.SiglaCombustivel
        }
    },

    renderMany(data: AllDataInterface[]) {
        return data.map(data => this.render(data))
    }
}
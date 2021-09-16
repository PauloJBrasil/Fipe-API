import { BookmarksInterface } from "../interfaces/bookmarksInterface"

export default {
    render(bookmark: BookmarksInterface) {
        return {
            _id: bookmark._id,
            Email: bookmark.email,
            Valor: bookmark.Valor,
            Combustivel: bookmark.Combustivel,
            Marca: bookmark.Marca,
            Modelo: bookmark.Modelo,
            AnoModelo: bookmark.AnoModelo,
            TipoVeiculo: bookmark.TipoVeiculo,
            SiglaCombustivel: bookmark.SiglaCombustivel
        }
    },

    renderMany(bookmark: BookmarksInterface[]) {
        return bookmark.map(bookmark => this.render(bookmark))
    }
}
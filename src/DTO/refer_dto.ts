import { ReferInterface } from "../interfaces/referInterface";

export default {
    render(refer: ReferInterface) {
        return {
            Codigo: refer.Codigo,
            Mes: refer.Mes
        }
    },

    renderMany(refer: ReferInterface[]) {
        return refer.map(refer => this.render(refer))
    }
}
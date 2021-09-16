import { YearInterface } from "../interfaces/yearInterface"

export default {
    render(year: YearInterface) {
        return {
            Label: year.Label,
            Ano: year.Value
        }
    },

    renderMany(year: YearInterface[]) {
        return year.map(year => this.render(year))
    }
}
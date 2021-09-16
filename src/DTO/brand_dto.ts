import { BrandInterface } from "../interfaces/brandInterface"
export default {
    render(brand: BrandInterface) {
        return {
            Marca: brand.Label,
            Value: brand.Value
        }
    },

    renderMany(brand: BrandInterface[]) {
        return brand.map(brand => this.render(brand))
    }
}
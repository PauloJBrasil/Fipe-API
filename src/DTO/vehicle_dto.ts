import { VehicleInterface } from "../interfaces/vehicleInterface"

export default {
    render(vehicle: VehicleInterface) {
        return {
            Modelo: vehicle.Label,
            Value: vehicle.Value
        }
    },

    renderMany(vehicle: VehicleInterface[]) {
        return vehicle.map(vehicle => this.render(vehicle))
    }
}
import { Model, model, Schema } from 'mongoose';
import { VehicleInterface } from '../interfaces/vehicleInterface';

const VehicleSchema: Schema = new Schema<VehicleInterface>({
    Label: {type: String},
    Value: {type: Number}
});

const Vehicle : Model<VehicleInterface> = model('Vehicle', VehicleSchema)

export default Vehicle;
import { Model, model, Schema } from 'mongoose';
import { ReferInterface } from '../interfaces/referInterface';

const ReferSchema: Schema = new Schema<ReferInterface>({
    Codigo: {type: Number},
    Mes: {type: String}
});

const Refer : Model<ReferInterface> = model('Refer', ReferSchema)

export default Refer;
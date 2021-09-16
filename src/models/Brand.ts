import { Model, model, Schema } from 'mongoose';
import { BrandInterface } from '../interfaces/brandInterface';

const BrandSchema: Schema = new Schema<BrandInterface>({
    Label: {type: String},
    Value: {type: Number}
});

const Brand : Model<BrandInterface> = model('Brand', BrandSchema)

export default Brand;

import { model, Schema } from 'mongoose';
import { UserInterface } from '../interfaces/UserInterface';

const ReferSchema: Schema = new Schema<UserInterface>({
    email: {type: String, required: true},
    password: {type: String, required: true}
    },
    {
        timestamps: true
    }
    );

export default model<UserInterface>('User', ReferSchema);
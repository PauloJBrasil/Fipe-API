
import { model, Schema } from 'mongoose';
import { BookmarksInterface } from '../interfaces/bookmarksInterface';

const BookmarkSchema: Schema = new Schema<BookmarksInterface>({
    email: {type: String, required: true},
    Valor: {type: String, required: true},
    Combustivel: {type: String, required: true},
    Marca: {type: String, required: true},
    Modelo: {type: String, required: true},
    AnoModelo: {type: Number, required: true},
    TipoVeiculo: {type: Number, required: true},
    SiglaCombustivel: {type: String, required: true}
    },
    {
        timestamps: true
    }
    );

export default model<BookmarksInterface>('Bookmark', BookmarkSchema);
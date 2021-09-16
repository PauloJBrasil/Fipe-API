import refersController from '../../controller/refersController';
import { response, Router } from 'express';

const routes = Router();


//Na rota raiz criará cache para armazenamento de todos os códigos referentes ao mês
routes.route('/')
    .get(refersController.verifyAndCreate)


//Na rota Refer buscará todos os códigos
routes.route('/refer')
    .get(refersController.findActualMonth)


export default routes;
import { Router } from 'express';

import vehiclesController from '../../controller/vehiclesController';

const routes = Router();

routes.route('/vehicles')
    .get(vehiclesController.findModel)

routes.route('/vehicle')
    .get(vehiclesController.findModelYear)

routes.route('/vehicle/:modelCode')
    .get(vehiclesController.allDataAboutTheVehicle)

export default routes;
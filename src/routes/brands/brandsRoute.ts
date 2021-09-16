import { Router } from 'express';

import brandsController from '../../controller/brandsController';

const routes = Router();

routes.route('/brands')
    .get(brandsController.find)

export default routes;
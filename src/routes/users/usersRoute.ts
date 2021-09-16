import { Router } from 'express';

import usersController from '../../controller/usersController';
import extractJWT from '../../middleware/extractJWT';

const routes = Router();

routes.route('/user')
    .get(usersController.login)
    .post(usersController.register)

routes.route('/user/validate')
    .all(extractJWT, usersController.validateToken)

export default routes;
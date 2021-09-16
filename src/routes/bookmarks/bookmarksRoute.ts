import { Router } from 'express';

import bookmarksController from '../../controller/bookmarksController';

const routes = Router();

routes.route('/bookmarks')
    .post(bookmarksController.create)
    .get(bookmarksController.list)
    .delete(bookmarksController.remove)

export default routes;
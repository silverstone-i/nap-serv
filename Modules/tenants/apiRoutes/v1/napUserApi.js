'use strict';

/*
* Copyright © 2024-present, Ian Silverstone
*
* See the LICENSE file at the top-level directory of this distribution
* for licensing information.
*
* Removal or modification of this copyright notice is prohibited.
*/

import { Router } from 'express';
import NapUserController from '../../controllers/NapUserController.js';

const router = Router();


router
  .route('/')
  .post(NapUserController.create)
  .get(NapUserController.getAll);

router
  .route('/:id')
  .get(NapUserController.getById)
  .put(NapUserController.update)
  .delete(NapUserController.remove);

export default router;
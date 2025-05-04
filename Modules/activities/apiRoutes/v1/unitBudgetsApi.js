

'use strict';

/*
* Copyright © 2024-present, Ian Silverstone
*
* See the LICENSE file at the top-level directory of this distribution
* for licensing information.
*
* Removal or modification of this copyright notice is prohibited.
*/

import express from 'express';
import UnitBudgetsController from '../../controllers/UnitBudgetsController.js';

const router = express.Router();

router
  .route('/')
  .post(UnitBudgetsController.create)
  .get(UnitBudgetsController.getAll);

router
  .route('/:id')
  .get(UnitBudgetsController.getById)
  .put(UnitBudgetsController.update)
  .delete(UnitBudgetsController.remove);

export default router;
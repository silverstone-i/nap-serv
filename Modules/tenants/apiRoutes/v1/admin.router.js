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
import { getAllSchemas, switchSchema } from '../../controllers/admin.controller.js';

const router = express.Router();

router.get('/schemas', getAllSchemas);
router.post('/switch-schema/:schema', switchSchema);

export default router;

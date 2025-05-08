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
import tenantsApi from './tenantsApi.js';
import napUsersApi from './napUsersApi.js';

const router = express.Router();

router.use('/v1/nap-users', napUsersApi);
router.use('/v1/tenants', tenantsApi);

console.log('Loaded tenantsApi router');

export default router;

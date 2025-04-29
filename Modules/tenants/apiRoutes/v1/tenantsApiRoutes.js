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
import { readdirSync } from 'fs';
import path from 'path';

const router = express.Router();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Automatically read all API files inside v1/
const files = readdirSync(__dirname).filter(file => file.endsWith('Api.js'));

for (const file of files) {
  const routeModule = await import(`./${file}`);
  const route = routeModule.default;

  let mountPath = file
    .replace('Api.js', '') // Remove 'Api.js'
    .replace(/[A-Z]/g, letter => '-' + letter.toLowerCase()) // camelCase to kebab-case
    .replace(/^-/, '');

  if (mountPath === 'nap-user') mountPath = 'users';
  if (mountPath === 'tenant') mountPath = 'tenants';

  router.use(`/${mountPath}`, route);
}

export default router;

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
import { addAuditFields } from '../../middleware/audit/addAuditFields.js';

/**
 * Creates an Express router with standard CRUD routes
 * @param {object} controller - An object with create, getAll, getById, update, remove methods
 * @param {function} [extendRoutes] - Optional function that receives the router for adding custom routes
 * @returns {Router} - Configured Express router
 */

export default function createRouter(controller, extendRoutes, options = {}) {
  const router = express.Router();

  const {
    postMiddlewares = [], // e.g. [authenticateJwt, requireNapsoftUser]
    getMiddlewares = [],
    putMiddlewares = [],
    deleteMiddlewares = [],
  } = options;

  const safePostMiddlewares = postMiddlewares.includes(addAuditFields)
    ? postMiddlewares
    : [addAuditFields, ...postMiddlewares];

  const safePutMiddlewares = putMiddlewares.includes(addAuditFields)
    ? putMiddlewares
    : [addAuditFields, ...putMiddlewares];

  // POST and GET for collection
  router.post('/', ...safePostMiddlewares, (req, res) => controller.create(req, res));
  router.get('/', ...getMiddlewares, (req, res) => controller.get(req, res));

  // Health check or diagnostic
  router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
  });

  // Detail routes with optional middleware
  router.get('/:id', ...getMiddlewares, (req, res) => controller.getById(req, res));
  router.put('/:id', ...safePutMiddlewares, (req, res) => controller.update(req, res));
  router.delete('/:id', ...deleteMiddlewares, (req, res) => controller.remove(req, res));

  if (typeof extendRoutes === 'function') {
    extendRoutes(router);
  }

  return router;
}
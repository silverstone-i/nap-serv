'use strict';

/*
 * Copyright © 2024-present, Ian Silverstone
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

import { createController } from '../../../src/utils/createController.js';

const InterCompanyTransactionsController = createController(
  'interCompanyTransactions',
  {},
  'Inter-company Transaction'
);

export default InterCompanyTransactionsController;

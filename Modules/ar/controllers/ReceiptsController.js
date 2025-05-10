'use strict';

/*
 * Copyright © 2024-present, Ian Silverstone
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

import BaseController from '../../../src/utils/BaseController.js';

class ReceiptsController extends BaseController {
  constructor(model = db.receipts) {
    super('receipts', 'Receipt');
    this.model = model;
  }
}

const instance = new ReceiptsController();

export default instance; // Use in production and development environments
export { ReceiptsController }; // Use in test environment
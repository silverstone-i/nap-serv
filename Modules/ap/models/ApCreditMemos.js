'use strict';

/*
 * Copyright © 2024-present, Ian Silverstone
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

import { BaseModel } from 'pg-schemata';
import apCreditMemosSchema from '../schemas/apCreditMemosSchema.js';

class ApCreditMemos extends BaseModel {
  constructor(db, pgp, logger = null) {
    super(db, pgp, apCreditMemosSchema, logger);
  }
}

export default ApCreditMemos;

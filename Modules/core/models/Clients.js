

'use strict';

/*
 * Copyright © 2024-present, Ian Silverstone
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

import { TableModel } from 'pg-schemata';
import clientsSchema from '../schemas/clientsSchema.js';

class Clients extends TableModel {
  constructor(db, pgp) {
    super(db, pgp, clientsSchema);
  }
}

export default Clients;
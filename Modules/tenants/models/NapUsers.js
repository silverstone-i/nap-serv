'use strict';

/*
* Copyright © 2024-present, Ian Silverstone
*
* See the LICENSE file at the top-level directory of this distribution
* for licensing information.
*
* Removal or modification of this copyright notice is prohibited.
*/

import {BaseModel} from 'pg-schemata';
import napUsersSchema from '../schemas/napUsersSchema.js';

class NapUsers extends BaseModel {
  constructor(db, pgp) {
    super(db, pgp, napUsersSchema);
  }
}

export default NapUsers;
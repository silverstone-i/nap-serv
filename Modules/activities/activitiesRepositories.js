'use strict';

/*
 * Copyright © 2024-present, Ian Silverstone
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

import Activities from './models/Activities.js';
import ActualCosts from './models/ActualCosts.js';
import Categories from './models/Categories.js';
import ChangeOrderLines from './models/ChangeOrderLines.js';
import CostLines from './models/CostLines.js';
import Projects from './models/Projects.js';
import DeliverableAssignments from './models/DeliverableAssignments.js';
import Deliverables from './models/Deliverables.js';
import Budgets from './models/Budgets.js';
import VendorParts from './models/VendorParts.js';

const repositories = {
  activities: Activities,
  actualCosts: ActualCosts,
  categories: Categories,
  changeOrderLines: ChangeOrderLines,
  costLines: CostLines,
  projects: Projects,
  deliverableAssignments: DeliverableAssignments,
  deliverables: Deliverables,
  budgets: Budgets,
  vendorParts: VendorParts,
};

export default repositories;

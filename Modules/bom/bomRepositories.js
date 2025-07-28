'use strict';

/*
 * Copyright © 2024-present, Ian Silverstone
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

import CatalogSkus from './models/CatalogSkus.js';
import VendorSkus from './models/VendorSkus.js';
import EmbeddingSkus from './models/EmbeddingSkus.js';

const repository = {
  catalogSkus: CatalogSkus,
  vendorSkus: VendorSkus,
  embeddingSkus: EmbeddingSkus,
};

export default repository;

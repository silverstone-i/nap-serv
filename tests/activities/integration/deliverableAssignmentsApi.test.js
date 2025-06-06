'use strict';

/*
 * Copyright © 2024-present, Ian Silverstone
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

import { runExtendedCrudTests } from '../../util/runExtendedCrudTests.js';
import { db } from '../../../src/db/db.js';

const tenant_id = '00000000-0000-4000-a000-000000000001';

export const setupTestDependencies = async () => {
  const project = await db.projects.insert({
    tenant_id,
    project_code: 'UA-PRJ',
    name: 'UA Project',
    status: 'planning',
    created_by: 'integration-test',
  });

  const deliverable = await db.deliverables.insert({
    tenant_id,
    deliverable_code: 'UA-SP',
    description: 'SP for assignment',
    status: 'pending',
    created_by: 'integration-test',
  });

  return { project, deliverable };
};

export const cleanupTestDependencies = async () => {
  const all = await db.deliverableAssignments.findAll();
  for (const row of all) await db.deliverableAssignments.delete(row.id);

  const projects = await db.projects.findAll();
  for (const row of projects) await db.projects.delete(row.id);

  const deliverables = await db.deliverables.findAll();
  for (const row of deliverables) await db.deliverables.delete(row.id);
};

const routePrefix = '/api/activities/v1/deliverable-assignments';

const testContext = {};

await runExtendedCrudTests({
  routePrefix,
  testRecord: () => ({
    tenant_id,
    project_id: testContext.project.id,
    deliverable_id: testContext.deliverable.id,
    assigned_code: 'SP-01',
    status: 'planned',
    created_by: 'integration-test',
  }),
  updateField: 'status',
  updateValue: 'released',
  beforeHook: async () => {
    const deps = await setupTestDependencies();
    Object.assign(testContext, deps);
  },
  afterHook: cleanupTestDependencies,
});

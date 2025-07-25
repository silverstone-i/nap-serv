'use strict';
// @ts-check

/*
 * Copyright © 2024-present, Ian Silverstone
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

/** @typedef {import('pg-schemata/src/schemaTypes').TableSchema} TableSchema */

/** @type {TableSchema} */
const schema = {
  dbSchema: 'tenantid',
  table: 'projects',
  hasAuditFields: true,
  softDelete: true,
  version: '1.0.0',
  columns: [
    {
      name: 'id',
      type: 'uuid',
      default: 'uuidv7()',
      nullable: false,
      immutable: true,
      colProps: { cnd: true },
    },
    { name: 'tenant_id', type: 'uuid', nullable: false },
    { name: 'company_id', type: 'uuid', nullable: false },

    { name: 'project_code', type: 'varchar(32)', nullable: false },
    { name: 'name', type: 'varchar(255)', nullable: false },
    { name: 'client_id', type: 'uuid', nullable: true },
    { name: 'address_id', type: 'uuid', nullable: true },
    { name: 'description', type: 'text', nullable: true },
    { name: 'notes', type: 'text', nullable: true },
    {
      name: 'status',
      type: 'varchar(20)',
      default: `'planning'`,
      nullable: false,
    },
  ],
  constraints: {
    primaryKey: ['id'],
    foreignKeys: [
      {
        type: 'ForeignKey',
        columns: ['client_id'],
        references: { table: 'clients', columns: ['id'] },
        onDelete: 'SET NULL',
      },
      {
        type: 'ForeignKey',
        columns: ['address_id'],
        references: { table: 'addresses', columns: ['id'] },
        onDelete: 'SET NULL',
      },
      {
        type: 'ForeignKey',
        columns: ['company_id'],
        references: { table: 'inter_companies', columns: ['id'] },
        onDelete: 'RESTRICT',
      },
    ],
    unique: [['project_code']],
    indexes: [
      { type: 'Index', columns: ['tenant_id', 'project_code'] },
      { type: 'Index', columns: ['client_id'] },
      { type: 'Index', columns: ['tenant_id', 'project_code', 'version'] },
    ],
    checks: [
      {
        type: 'Check',
        expression: `status IN ('planning', 'budgeting', 'released', 'complete')`,
      },
    ],
  },
};

export default schema;

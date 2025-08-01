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
import z from 'zod';

const schema = {
  dbSchema: 'tenantid',
  table: 'task_groups',
  version: '1.0.0',
  hasAuditFields: true,
  softDelete: true,

  columns: [
    { name: 'id', type: 'uuid', notNull: true, default: 'uuidv7()', immutable: true },
    { name: 'tenant_code', type: 'varchar(6)', notNull: true },
    { name: 'code', type: 'varchar(50)', notNull: true, colProps: { validator: z.coerce.string() } }, // Used for filtering/partitioning but not for indexing or uniqueness
    { name: 'name', type: 'varchar(150)', notNull: true },
    { name: 'description', type: 'text', notNull: false },
    { name: 'sequence', type: 'integer' },
  ],

  constraints: {
    primaryKey: ['id'],
    unique: [['code'], ['name']],
  },
};

export default schema;

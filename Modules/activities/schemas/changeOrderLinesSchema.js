'use strict';

/*
 * Copyright © 2024-present, Ian Silverstone
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

const schema = {
  dbSchema: 'tenantid',
  table: 'change_order_lines',
  hasAuditFields: true,
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
    {
      name: 'tenant_id',
      type: 'uuid',
      nullable: false,
      colProps: { cnd: true },
    },
    {
      name: 'unit_id',
      type: 'uuid',
      nullable: false,
    },
    {
      name: 'activity_id',
      type: 'uuid',
      nullable: false,
    },
    {
      name: 'reason',
      type: 'text',
      nullable: true,
    },
    {
      name: 'change_amount',
      type: 'numeric(12,2)',
      nullable: false,
    },
    {
      name: 'currency',
      type: 'varchar(3)',
      nullable: false,
    },
    {
      name: 'reference',
      type: 'text',
      nullable: true,
    },
    {
      name: 'status',
      type: 'varchar(20)',
      default: `'pending'`,
      nullable: false,
    },
    {
      name: 'approved_by',
      type: 'uuid',
      nullable: true,
    },
    {
      name: 'approved_at',
      type: 'timestamptz',
      default: 'now()',
      nullable: true,
    },
    {
      name: 'approval_note',
      type: 'text',
      nullable: true,
    },
  ],
  constraints: {
    primaryKey: ['id'],
    unique: [['tenant_id', 'unit_id', 'activity_id', 'reference']],
    foreignKeys: [
      {
        type: 'ForeignKey',
        columns: ['unit_id'],
        references: { table: 'tenantid.units', columns: ['id'] },
        onDelete: 'CASCADE',
      },
      {
        type: 'ForeignKey',
        columns: ['activity_id'],
        references: { table: 'tenantid.activities', columns: ['id'] },
        onDelete: 'CASCADE',
      },
    ],
    checks: [
      {
        type: 'Check',
        expression: `status IN ('pending', 'approved', 'rejected')`,
      },
    ],
    indexes: [
      { type: 'Index', columns: ['unit_id', 'activity_id', 'reference'] },
      { type: 'Index', columns: ['status'] },
    ],
  },
};

export default schema;

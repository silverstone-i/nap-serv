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
  table: 'costlines',
  hasAuditFields: true,
  version: '1.0.0',
  constraints: {
    primaryKey: ['id'],
    foreignKeys: [
      {
        type: 'ForeignKey',
        columns: ['activity_id'],
        references: { table: 'tenantid.activities', columns: ['id'] },
        onDelete: 'CASCADE',
      },
      {
        type: 'ForeignKey',
        columns: ['vendor_id', 'tenant_sku'],
        references: { table: 'tenantid.vendorparts', columns: ['vendor_id', 'tenant_sku'] },
        onDelete: 'SET NULL',
      },
      {
        type: 'ForeignKey',
        columns: ['unit_id'],
        references: { table: 'tenantid.units', columns: ['id'] },
        onDelete: 'CASCADE',
      },
      {
        type: 'ForeignKey',
        columns: ['unit_budget_id'],
        references: { table: 'tenantid.unit_budgets', columns: ['id'] },
        onDelete: 'SET NULL'
      },
      {
        type: 'ForeignKey',
        columns: ['company_id'],
        references: { table: 'tenantid.inter_companies', columns: ['id'] },
        onDelete: 'RESTRICT',
      },
    ],
    indexes: [
      {
        type: 'Index',
        columns: ['activity_id'],
      },
      {
        type: 'Index',
        columns: ['assembly_code'],
      },
      {
        type: 'Index',
        columns: ['unit_id', 'activity_id'],
      },
      {
        type: 'Index',
        columns: ['vendor_id'],
      },
      {
        type: 'Index',
        columns: ['source_type'],
      },
      {
        type: 'Index',
        columns: ['unit_id', 'vendor_id', 'activity_id', 'tenant_sku']
      }
    ],
    checks: [
      {
        type: 'Check',
        expression: `source_type IN ('material', 'labor')`
      }
    ],
  },

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
    {
      name: 'name',
      type: 'varchar(64)',
      nullable: false
    },
    { name: 'unit_id', type: 'uuid', nullable: false },
    { name: 'vendor_id', type: 'uuid', nullable: false },
    { name: 'activity_id', type: 'uuid', nullable: false },
    { name: 'unit_budget_id', type: 'uuid', nullable: true },
    { name: 'tenant_sku', type: 'varchar(64)', nullable: true },
    { name: 'source_type', type: 'varchar(16)', default: `'material'`, nullable: false }, // e.g., 'material' or 'labor'
    { name: 'quantity', type: 'numeric(12,4)', nullable: false },
    { name: 'unit', type: 'varchar(20)', nullable: true },
    { name: 'unit_price', type: 'numeric(12,4)', nullable: false },
    { name: 'amount', type: 'numeric(12,2)', generated: '(quantity * unit_price)', stored: true },
    { name: 'markup_pct', type: 'numeric(5,2)', nullable: true },
    { name: 'assembly_code', type: 'varchar(16)', nullable: true },
  ],
};

export default schema;

import { EntitySchema } from 'typeorm';

export const BalanceEntity = new EntitySchema({
  name: 'Balance',
  tableName: 'balances',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    employeeId: {
      type: 'int',
    },
    locationId: {
      type: 'varchar',
    },
    employeeName: {
      type: 'varchar',
    },
    days: {
      type: 'int',
    },
  },
});
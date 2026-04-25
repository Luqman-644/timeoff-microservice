import { EntitySchema } from 'typeorm';

export const TimeoffEntity = new EntitySchema({
  name: 'Timeoff',
  tableName: 'timeoffs',
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
    days: {
      type: 'int',
    },
    status: {
      type: 'varchar',
    },
  },
});
import { Environment, Table, schema } from 'nothinkdb';

class BaseTable extends Table {
  constructor(options) {
    super({
      ...options,
      schema: () => ({
        id: schema.id,
        updatedAt: schema.updatedAt,
        createdAt: schema.createdAt,
        ...options.schema(),
      }),
    });
  }
}

const env = new Environment({
  Table: BaseTable,
});

export default env;


exports.up = (knex, Promise) => {
  return knex.schema.createTable('admin', (table) => {
      table.string('externalID').unique().notNullable().primary();
      table.string('name');
      table.string('title');
      table.text('address');
      table.string('phone', 15);
      table.boolean('isAdmin').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('admin');
};

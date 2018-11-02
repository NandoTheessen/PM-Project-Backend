
exports.up = (knex, Promise) => {
  return knex.schema.createTable('customer_email', (table) => {
      table.increments();
      table.string('email').unique().notNullable();
      table.string('cust_id').unsigned();
      table.foreign('cust_id').references('customer.externalID');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('customer_email');
};

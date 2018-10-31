
exports.up = (knex, Promise) => {
  return knex.schema.createTable('customer_email', (table) => {
      table.string('email').unique().notNullable();
      table.integer('cust_id').unsigned();
      table.foreign('cust_id').references('customer.id');
      table.primary(['email', 'cust_id']);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('customer_email');
};


exports.up = (knex, Promise) => {
  return knex.schema.createTable('admin_email', (table) => {
      table.increments();
      table.string('email').unique().notNullable();
      table.string('admin_id').unsigned().notNullable();
      table.foreign('admin_id').references('admin.externalID');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('admin_email');
};

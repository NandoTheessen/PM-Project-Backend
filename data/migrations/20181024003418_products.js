exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.text('description');
        table.float('price');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products');
};

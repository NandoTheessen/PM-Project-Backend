
exports.up = (knex, Promise) => {
    return knex.schema.createTable('prod_order', (table) => {
        table.increments();
        table.integer('order_id').unsigned();
        table.foreign('order_id').references('order.id');
        table.integer('prod_id').unsigned();
        table.foreign('prod_id').references('products.id');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('prod_order');
};

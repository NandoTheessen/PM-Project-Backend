
exports.up = (knex, Promise) => {
    return knex.schema.createTable('customer', (table) => {
        table.string('externalID').unique().notNullable().primary();
        table.string('name');
        table.text('address');
        table.string('phone', 15)
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('customer');
};


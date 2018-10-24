
exports.up = (knex, Promise) => {
    return knex.schema.createTable('customer', (table) => {
        table.increments();
        table.string('username').unique().notNullable();
        table.string('externalID').unique().notNullable();
        table.string('name');
        table.text('address');
        table.string('email');
        table.string('phone', 15)
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('customer');
};


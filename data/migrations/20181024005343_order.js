exports.up = (knex, Promise) => {
    return knex.schema.createTable('order', (table) => {
        table.increments();
        table.date('origination_date').unique().notNullable();
        table.date('estimated_date').unique().notNullable();
        table.date('completion_date');
        table.string('progress');
        table.string('cust_id').unsigned();
        table.foreign('cust_id').references('customer.externalID');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('order');
};

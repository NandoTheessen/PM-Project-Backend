exports.up = (knex, Promise) => {
    return knex.schema.createTable('order', (table) => {
        table.increments();
        table.date('origination_date').notNullable();
        table.date('estimated_date').notNullable();
        table.date('completion_date');
        table.string('progress');
        table.string('cust_id').unsigned();
        table.foreign('cust_id').references('customer.externalID');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('order');
};

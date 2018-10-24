exports.up = (knex, Promise) => {
    return knex.schema.createTable('order', (table) => {
        table.increments();
        table.date('origination_date').unique().notNullable();
        table.date('estimated_date').unique().notNullable();
        table.date('completion_date');
        table.string('progress');
        table.integer('cust_id').unsigned();
        table.foreign('cust_id').references('customer.id');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('order');
};

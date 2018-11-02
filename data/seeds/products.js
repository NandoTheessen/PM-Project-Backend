
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {name: "some product", description: 'something longer than it needs to be', price: 1.05},
        {name: "some product 2", description: 'mope longer than it needs to be', price: 2.05},
        {name: "some product 3", description: 'yep longer than it needs to be', price: 100.05},
      ]);
    });
};

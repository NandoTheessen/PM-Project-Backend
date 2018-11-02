
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order').del()
    .then(function () {
      // Inserts seed entries
      return knex('order').insert([
        {
          origination_date: "2018-11-02",
          estimated_date: "2018-11-02",
          completion_date: "2018-11-02",
          progress: "started",
          cust_id: "108702022658439942950"
        },
        
      ]);
    });
};

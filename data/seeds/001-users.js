
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'thelibrarian', password: 'jerrytheman'},
        {id: 2, username: 'chewy', password: 'woofwoof'},
        {id: 3, username: 'flipflop', password: 'duder12'}
      ]);
    });
};

exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert([
          { project_name: 'project1' },
          { project_name: 'project2' }
        ], 'id')
        .then(project => {
          return knex('palettes').insert([
            { id:1,
              palette_name: 'ick candies',
              color0: '#000000',
              color1: '#111111',
              color2: '#222222',
              color3: '#333333',
              color4: '#444444',
              project_id: project[0]
            },
            { id:2,
              palette_name: 'sick sticks',
              color0: '#000000',
              color1: '#111111',
              color2: '#222222',
              color3: '#333333',
              color4: '#444444',
              project_id: project[0]
            }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
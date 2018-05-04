exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert([
          { project_name: 'Project1' },
          { project_name: 'Project2' }
        ], 'id')
        .then(project => {
          return knex('palettes').insert([
            { id:1,
              palette_name: 'Ick Candies',
              color0: '#258006',
              color1: '#42F3E7',
              color2: '#448232',
              color3: '#0D0F4C',
              color4: '#B93CE8',
              project_id: project[0]
            },
            { id:2,
              palette_name: 'Sick Sticks',
              color0: '#B93CE8',
              color1: '#0D0F4C',
              color2: '#448232',
              color3: '#42F3E7',
              color4: '#258006',
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


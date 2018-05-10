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
            { 
              "id": 1,
              "palette_name": "Ice-cream bar",
              "color0": "#B38938",
              "color1": "#A6C571",
              "color2": "#542912",
              "color3": "#818680",
              "color4": "#E871A9",
              "project_id": project[0],
            },
            { "id": 2,
              "palette_name": "Sick Sticks",
              "color0": "#B93CE8",
              "color1": "#0D0F4C",
              "color2": "#448232",
              "color3": "#42F3E7",
              "color4": "#258006",
              "project_id": project[1]
            }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
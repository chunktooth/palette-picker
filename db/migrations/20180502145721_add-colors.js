exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.string('color0');
      table.string('color1');
      table.string('color2');
      table.string('color3');
      table.string('color4');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.dropColumn('color0');
      table.dropColumn('color1');
      table.dropColumn('color2');
      table.dropColumn('color3');
      table.dropColumn('color4');
    })
  ]);
};
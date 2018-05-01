$(document).ready(displayColor);
$('.generate-btn').on('click', displayColor);


const palettes = [
  $('.palette1'),
  $('.palette2'), 
  $('.palette3'),
  $('.palette4'),
  $('.palette5')
];

function displayColor() {
  palettes.forEach(color => {
    let palette = generatePalette();
    color.css('background-color', palette)
    $(this).find('.hexcode').text(color);
  });
}

function generatePalette() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log(color);
  return color;
}



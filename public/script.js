$(document).ready(displayColors);
$('.generate-btn').on('click', displayColors);
$('.locker').on('click', toggleImage);

const palettes = [
  $('.palette1'),
  $('.palette2'), 
  $('.palette3'),
  $('.palette4'),
  $('.palette5')
];

function generateHex() {
  var digits = '0123456789ABCDEF';
  var hex = '#';
  for (var i = 0; i < 6; i++) {
    hex += digits[Math.floor(Math.random() * 16)];
  }
  return hex;
}

function displayColors() {
  palettes.forEach(palette => {
    let hex = generateHex();
    palette.css('background-color', hex)
    palette.find('.hexcode').text(hex);
  });
  lockPalette();
}

function toggleImage() {
  var locked = './images/locked.svg';
  var unlocked = './images/unlocked.svg';
  var src = $(this).attr('src') === locked ? unlocked : locked;

  $(this).attr('src', src);
}

function lockPalette() {
  if()
}
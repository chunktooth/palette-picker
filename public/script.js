$(document).ready(displayColors);
$('.generate-btn').on('click', displayColors);
$('.locker').on('click', toggleImage);
$('.save-project').on('click', saveProject);
$('.save-palette').on('click', savePalette);

const palettes = [
  $('.palette1'),
  $('.palette2'), 
  $('.palette3'),
  $('.palette4'),
  $('.palette5')
];

var hexArray = [];

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
    var hex;
    if (!palette.children('img').hasClass('locked')) {
      hex = generateHex();
      palette.css('background-color', hex)
      palette.find('.hexcode').text(hex); 
    }
    savePalette(hex);
  });
}

function toggleImage() { 
  var locked = './images/locked.svg';
  var unlocked = './images/unlocked.svg';
  var src = $(this).attr('src') === unlocked ? locked : unlocked;

  $(this).toggleClass('locked');
  $(this).attr('src', src);
}

function saveProject(e) {
  e.preventDefault();
  var projectName = $('.project-name').val();

  $('.project-list').prepend(`
    <option>${projectName}</option>
  `);

  $('.project-name').val('');
};

function savePalette(e) {
  e.preventDefault();
  var paletteName = $('.palette-name').val();

  $('.all-projects').prepend(`
    <div>
      
    </div>
  `)  
}
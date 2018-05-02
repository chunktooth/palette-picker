$(document).ready(displayColors);
$('.generate-btn').on('click', displayColors);
$('.locker').on('click', toggleLocker);
$('.save-project').on('click', saveProject);
$('.save-palette').on('click', savePalette);

const palettes = [
  $('.palette1'),
  $('.palette2'), 
  $('.palette3'),
  $('.palette4'),
  $('.palette5')
];

var hexCollection = [];

function generateHex() {
  var digits = '0123456789ABCDEF';
  var hex = '#';
    for (var i = 0; i < 6; i++) {
      hex += digits[Math.floor(Math.random() * 16)];
    }
  hexCollection.push(hex);
  console.log(hexCollection);
  return hex;
}

function displayColors() {
  palettes.forEach(palette => {
    var hex;
    if (!palette.children('img').hasClass('locked')) {
      hex = generateHex();
      palette.css('background-color', hex)
    }
      palette.find('.hexcode').text(hex); 
  });
}

function toggleLocker() { 
  var locked = './images/locked.svg';
  var unlocked = './images/unlocked.svg';
  var src = $(this).attr('src') === unlocked ? locked : unlocked;

  $(this).toggleClass('locked');
  $(this).attr('src', src);
}

function saveProject(e) {
  e.preventDefault();
  var projectName = $('.project-input').val();

  $('.project-list').prepend(`
    <option>${projectName}</option>
  `);

  $('.project-input').val('');
};

function savePalette(e) {
  e.preventDefault();
  var paletteName = $('.palette-input').val();
  var allProjects = $('.all-projects');

  allProjects.prepend(`
    <h3 class='palette-name'>${paletteName}</h3>
  `);
    console.log(hexCollection);

  allProjects.prepend(`
    <div class='color-thumbnail' 
        style='background-color:${hexCollection[0]}'></div>
    </div>
    <div class='color-thumbnail' 
        style='background-color:${hexCollection[1]}'></div>
    </div>
    <div class='color-thumbnail' 
        style='background-color:${hexCollection[2]}'></div>
    </div>
    <div class='color-thumbnail' 
        style='background-color:${hexCollection[3]}'></div>
    </div>
    <div class='color-thumbnail' 
        style='background-color:${hexCollection[4]}'></div>
    </div>
  `) 
  // });

    hexCollection = [];


  $('.palette-input').val('');  
};
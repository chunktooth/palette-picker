$(document).ready(displayColors);
$('.generate-btn').on('click', displayColors);
$('.locker').on('click', toggleLocker);
$('.make-project').on('click', postProject);
$('.save-palette').on('click', postPalette);
fetchProjects();

let hexCollection = [];

function generateHex() {
  let digits = '0123456789ABCDEF';
  let hex = '#';
    for (let i = 0; i < 6; i++) {
      hex += digits[Math.floor(Math.random() * 16)];
    }
  hexCollection.push(hex);
  return hex;
}

function displayColors() {
  const allPalettes = [
    $('.palette1'),
    $('.palette2'), 
    $('.palette3'),
    $('.palette4'),
    $('.palette5')
  ];
  allPalettes.forEach(palette => {
    if (!palette.children('img').hasClass('locked')) {
      let hex = generateHex();
      palette.css('background-color', hex)
      palette.find('.hexcode').text(hex); 
    }
  });
}

function toggleLocker() { 
  let locked = './images/locked.svg';
  let unlocked = './images/unlocked.svg';
  let src = $(this).attr('src') === unlocked ? locked : unlocked;

  $(this).toggleClass('locked');
  $(this).attr('src', src);
}

async function fetchProjects() {
  try {
    let response = await fetch('/api/v1/projects');
    let projects = await response.json();

    loadProjects(projects);

    return projects;
  } catch (error) {
    return error;
  }
}

async function postProject(event) {
  event.preventDefault();
  let projectName = $('.project-input').val();

  try {
    const response = await fetch('/api/v1/projects', {
      method: 'POST',
      body: JSON.stringify({project_name: projectName}),
      headers: { 'Content-Type': 'application/json' }
    });
    const projectId = await response.json();
    $('.project-input').val('');
    location.reload();
    return projectId;    
  } catch (error) {
    return error;
  }
};

function showProject(e) {
  e.preventDefault();
  let projectName = $('.project-input').val();
  let existingProject = $.map($('.project-name'), name => 
    $(name).text());
  let projectFound = existingProject.find(project => 
    project === projectName);
  postProject(projectName);

  if(!projectFound) {
    $('.project-list').prepend(`
      <option value='${projectName}'>${projectName}</option>`);
     $('.all-projects').prepend(`
      <h3 class='project-name'>Project: ${projectName}</h3>`)
  }
}

function loadProjects(projects) {
  projects.forEach(project => {
    $('.project-list').append(`
      <option value='${project.project_name}'>
        ${project.project_name}</option>`);
    $('.all-projects').append(`
      <div class=${project.project_id}>
      <h3 class='project-name'>Project: ${project.project_name}</h3>
      <img src='./images/white-rubbish.svg' class='bin' />
      </div>`)
  });
  fetchPalettes();
}

async function fetchPalettes() {
  try {
    let response = await fetch('/api/v1/palettes');
    let palettes = await response.json();
 
    loadPalettes(palettes);

    return palettes;
  } catch (error) {
    return error;
  }
}

async function postPalette(event) {
  event.preventDefault();
  let paletteName = $('.palette-input').val();
  let projectId = $('select').val();
  let response = await fetch('/api/v1/projects');
  let projects = await response.json();
  let project_id = projects.find(project => {
    project.project_name === project.id
  });

  try {
    const response = await fetch('/api/v1/palettes', {
      method: 'POST',
      body: JSON.stringify({ 
        palette_name: paletteName, 
        color0: hexCollection[0],
        color1: hexCollection[1],
        color2: hexCollection[2],
        color3: hexCollection[3],
        color4: hexCollection[4],
        project_id: project_id
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const palletteId = await response.json();

    $('.palette-input').val('');
    location.reload();
    return paletteId;
  } catch (error) {
    return error;
  }  
};

function showPalette(e) {
  e.preventDefault();
  let paletteName = $('.palette-input').val();

  $('.all-projects').prepend(`
    <div class='all-thumbs'>
      <h3 class='palette-name'>${paletteName}</h3>
      <div class='color-thumbnail' style='background-color:${hexCollection[0]}'></div>
      <div class='color-thumbnail' style='background-color:${hexCollection[1]}'></div>
      <div class='color-thumbnail' style='background-color:${hexCollection[2]}'></div>
      <div class='color-thumbnail' style='background-color:${hexCollection[3]}'></div>  
      <div class='color-thumbnail' style='background-color:${hexCollection[4]}'></div>
      <img src='./images/white-rubbish.svg' class='bin' />
    </div>
  `)
}

function loadPalettes(palettes) {
  console.log(palettes);

  palettes.forEach(palette => {
    $('.all-projects').append(`
      <div class='all-thumbs ${palette.palette_id}'>
        <h3 class='palette-name'>${palette.palette_name}</h3>
        <div class='color-thumbnail' style='background-color:${palette.color0}'></div>
        <div class='color-thumbnail' style='background-color:${palette.color1}'></div>
        <div class='color-thumbnail' style='background-color:${palette.color2}'></div>
        <div class='color-thumbnail' style='background-color:${palette.color3}'></div>  
        <div class='color-thumbnail' style='background-color:${palette.color4}'></div>
        <img src='./images/white-rubbish.svg' class='bin' />
      </div>
    `)
  });
} 
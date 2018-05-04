$(document).ready(displayColors);
loadData();
$('.generate-btn').on('click', displayColors);
$('.locker').on('click', toggleLocker);
$('.make-project').on('click', postProject);
$('.save-palette').on('click', postPalette);
$('.all-projects').on('click', '.delete-project', deleteProject);
$('.all-projects').on('click', '.delete-palette', deletePalette);

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

    return projects;
  } catch (error) {
    return error;
  }
}

async function fetchPalettes() {
  try {
    let response = await fetch('/api/v1/palettes');
    let palettes = await response.json();

    return palettes;
  } catch (error) {
    return error;
  }
}

async function loadData() {
  const projectArray = await fetchProjects();
  const paletteArray = await fetchPalettes();

  projectArray.forEach(project => {
    $('.project-list').append(`
      <option value='${project.project_name}'>
        ${project.project_name}</option>`);

    $('.all-projects').append(`
      <div class=${project.id}>
        <h3 class='project-name'>Project: ${project.project_name}</h3>    
        <p class='delete-project'>Delete Project</p>
      </div>`)
  });

  paletteArray.forEach(palette => {
    console.log(palette);
    $(`.${palette.project_id}`).append(`
        <div class=`all-thumbs ${palette.palette_id}`>
          <h3 class='palette-name'>${palette.palette_name}</h3>
          <div class='color-thumbnail' style='background-color:${palette.color0}'></div>
          <div class='color-thumbnail' style='background-color:${palette.color1}'></div>
          <div class='color-thumbnail' style='background-color:${palette.color2}'></div>
          <div class='color-thumbnail' style='background-color:${palette.color3}'></div>  
          <div class='color-thumbnail' style='background-color:${palette.color4}'></div>
          <img src='./images/white-rubbish.svg' 
          class='bin delete-palette'/>
        </div>
    `)
  });
}

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
     $('.all-projects ').prepend(`
      <h3 class='project-name' id=${projectId}>Project: ${projectName}</h3>`)
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

async function postPalette(event) {
  event.preventDefault();
  let paletteName = $('.palette-input').val();
  let projectName = $('select').val();

  let response = await fetch('/api/v1/projects');
  let projects = await response.json();
  let project_id = projects.find(project => 
    project.project_name === projectName).id;

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

async function deleteProject() {
  const projectId = $(this).parent('div')[0].className;

    try {
    const response = await fetch('/api/v1/projects', {
      method: 'DELETE',
      body: JSON.stringify({ id: projectId }),
      headers: { 'Content-Type': 'application/json' }
    })
    $(this).parent().remove();
  } catch (error) {
    return error;
  }
}

async function deletePalette() {
  const thisPalette = $(this).parent('div');
  console.log(thisPalette);

  try {
    const response = await fetch('/api/v1/palettes', {
      method: 'DELETE',
      body: JSON.stringify({ id: thisPalette }),
      headers: { 'Content-Type': 'application/json' }
    })
    $(this).parent().remove();
  } catch (error) {
    return error;
  }
}
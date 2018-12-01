import {} from './global/global';

/*
let traverseListButton = document.getElementById('traverse');
traverseListButton.addEventListener('click', () => {

  let list = document.getElementById('projects');
  let items = list.getElementsByTagName('li');
  let listItems = [];

// prepare data to be formed into an object 
for (var r = 0; r < items.length; ++r) {

  let liText = items[r].textContent;

  let projSplit = liText.split('_');
  let projTask = projSplit[0];
  projSplit = projSplit[1].split('º');
  let taskTime = projSplit[0];
  let projName = projSplit[1];

  listItems.push({
    task: projTask,
    time: taskTime,
    name: projName,
    data: projSplit
  });
}

let objects = [];
for (let v = 0; v < listItems.length; v++) {
  objects[v] = {
    Task: listItems[v].task,
    Time: listItems[v].time,
    ProjectName: listItems[v].name,
    Data: listItems[v].data
  };
}

let readobjects = JSON.stringify(objects);
let listLength = JSON.stringify(objects.length);
alert(readobjects);
});
*/

export {createListItemObj};


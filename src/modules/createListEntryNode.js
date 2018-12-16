import {projectNameAndColor} from './listInteractions';

// pass new task entry object as arg 
function createListItemNode(obj) {

  // task node first 
  const taskNode = document.createElement("div");
  taskNode.className = "listTask";
  taskNode.innerHTML = obj.task_name;

  // create digital time component 
  const clockTimerElementNode = document.createElement("div");
  clockTimerElementNode.className = "listClockTime";
  clockTimerElementNode.innerHTML = obj.digital_time;

  // create delete + append time elements, place in container div 
  const deleteLiIcon = document.createElement("span");
  let iElem = document.createElement("i");
  let iClasses = ['fa', 'fa-trash'];
  iElem.classList.add(...iClasses);
  deleteLiIcon.appendChild(iElem);

  const appendTimeIcon = document.createElement("span");
  let iElem2 = document.createElement("i");
  let iClasses2 = ['fa', 'fa-play'];
  iElem2.classList.add(...iClasses2);
  appendTimeIcon.appendChild(iElem2);

  const deleteTimeIcons = document.createElement("div");
  deleteTimeIcons.className = "deleteTimeIcons";
  deleteTimeIcons.appendChild(appendTimeIcon);
  deleteTimeIcons.appendChild(deleteLiIcon);

  // build project name li element
  const projectNameIcon = document.createElement("div");
  projectNameIcon.className = "projIcon";

  let iElem3 = document.createElement("h6");
  let iconColor = projectNameAndColor()[1];
  iElem3.style.backgroundColor = iconColor;
  iElem3.innerHTML = obj.project_name;
  projectNameIcon.appendChild(iElem3);

  // create billing icon li element 
  const projectBillIcon = document.createElement("div");
  let classesToAdd3 = ['billIcon', 'noselect'];
  projectBillIcon.classList.add(...classesToAdd3);
  projectBillIcon.innerHTML = "$";

  // create timestamp li element 
  const taskTimeStampNode = document.createElement("div");
  taskTimeStampNode.className = "timestamp";
  taskTimeStampNode.innerHTML = obj.time_stamp;

  // declare new li node, add list data  
  const node = document.createElement("li");
  let classesToAdd = ['listItem', 'ui-sortable-handle'];
  node.classList.add(...classesToAdd);
  // add list items to li node                
  node.appendChild(taskNode);
  node.appendChild(projectNameIcon);
  node.appendChild(projectBillIcon);
  // timer elements on far right 
  node.appendChild(taskTimeStampNode);
  node.appendChild(clockTimerElementNode);
  // add time, delete, and billing icons 
  node.appendChild(deleteTimeIcons);

  return node;
}

export {createListItemNode};
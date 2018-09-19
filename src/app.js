import {dragDropList} from './modules/drag-drop';
import {listSearch} from './modules/list-search';
import {addListTask, deleteListItem, toggleBilling, hideListInput} from './modules/li-delete-hide';

import {startTimer, trackListItemTime} from './modules/timer-components';

import {toggleProjectDropdown, filterFunction, filterEntry, appendProjToButton} from './modules/dropdown-button';

import {appendToList, colorCodeButtons} from './modules/list-interactions';

// drag drop 
dragDropList();

// <li> alphabetical search 
listSearch(); 

// li items delete, hide 
addListTask();
deleteListItem();

hideListInput();
trackListItemTime();

// choose project dropdown 
toggleProjectDropdown();
filterFunction();
filterEntry();
appendProjToButton();

// initialize <li> append
appendToList();
colorCodeButtons();

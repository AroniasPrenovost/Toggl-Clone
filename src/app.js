import {dragDropList} from './modules/drag-drop';
import {listSearch} from './modules/list-search';
import {addListTask, deleteListItem, toggleBill, hideListInput} from './modules/li-delete-hide';
import {startTimer, trackListItemTime} from './modules/timer-components';
import {toggleProjectDropdown, filterFunction, filterEntry, appendProjToButton} from './modules/dropdown-button';
import {resetInputs, showLis, getRandomColor, changeProjectNameColors, validateTimeEntry, colorCodeButtons, determineProjectTagColors, projectNameAndColor} from './modules/list-interactions';

// drag drop 
dragDropList();
toggleBill();

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

// initialize append 
colorCodeButtons();

const appendToList = () => {
    $("input[type='text'").keypress(function(event){
        if(event.which === 13){
            if (validateTimeEntry() === true) {

            // grab new todo text from input
            let todoText = $(this).val();
            $(this).val(""); 

            let deleteLiIcon = "<span><i class='fa fa-trash'></i></span>";
            let appendTimeIcon = "<p><i class='fa fa-hourglass'></i></p>";

            let titleAndColor = projectNameAndColor();
            let projtitle = titleAndColor[0];
            let iconColor = titleAndColor[1];

            let projectNameIcon = "<div class='projIcon'><h6 style='background-color:" + iconColor + "'" + ">" + projtitle + "</h6></div>";
            let projectBillIcon = "<div class='billIcon noselect'>$</div>";

            // create a new li and add to ul
            $("ul").append("<li class='listItem'>" + deleteLiIcon + appendTimeIcon + "<div class='separator'>&nbsp;_&nbsp;</div>" + "<div class='separator'>&#186;</div>" + todoText + projectNameIcon + projectBillIcon + "</li>");

            // show lis + reset inputs 
            showLis();
            resetInputs();
            }  
        } 
    });
}
// initialize <li> append
appendToList();


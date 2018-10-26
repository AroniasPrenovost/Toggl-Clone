import {dragDropList} from './modules/dragDrop';
import {listSearch} from './modules/dropListSearch';
import {addListTask, deleteListItem} from './modules/liDeleteHide';
import {toggleBilling} from './modules/toggleBilling';
import {startTimer, trackListItemTime} from './modules/timerComponents';
import {toggleProjectDropdown, filterFunction, filterEntry, appendProjToButton} from './modules/dropDownButton';
import {resetInputs, showLis, getRandomColor, changeProjectNameColors, colorCodeButtons, determineProjectTagColors, projectNameAndColor} from './modules/listInteractions';
import {checkTaskInput, validateTimerModeEntry, checkAssignedProject} from './modules/timerInputValidators';
import {} from './modules/traverseList';
import {} from './modules/toggleInputs';

// ----- Instant Functions ----- // 
listSearch(); 

// drag drop 
dragDropList();

toggleBilling();

// li items delete, hide 
addListTask();
deleteListItem();
trackListItemTime();

// choose project dropdown 
toggleProjectDropdown();
filterFunction();
filterEntry();
// ----- ---------------- ----- //

appendProjToButton();

// initialize append 
colorCodeButtons();

const appendToList = () => {
    $("input[type='text'").keypress(function(event){
        if(event.which === 13){
            if (checkTaskInput() == true && validateTimerModeEntry() === true && checkAssignedProject() === true) {
                   
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

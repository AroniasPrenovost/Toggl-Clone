import {dragDropList} from './modules/dragDrop';
import {listSearch} from './modules/dropListSearch';
import {addListTask, deleteListItem} from './modules/liDeleteHide';
import {toggleBilling, checkBillingToggle} from './modules/toggleBilling';
import {startTimer, trackListItemTime} from './modules/timerComponents';
import {toggleProjectDropdown, filterFunction, filterEntry, appendProjToButton} from './modules/dropDownButton';
import {resetInputs, showLis, getRandomColor, changeProjectNameColors, determineProjectTagColors, projectNameAndColor, getTaskInput, getClockTimer} from './modules/listInteractions';
import {checkTaskInput, validateTimerModeEntry, checkAssignedProject} from './modules/timerInputValidators';
// import {} from './modules/traverseList';
import {checkManualInputModeToggle} from './modules/toggleInputs';

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

const appendToList = () => {
    if (checkTaskInput() == true && validateTimerModeEntry() === true && checkAssignedProject() === true) {

        // get task input  
        let task = getTaskInput(); 

        // get timer input
        let clockTimer = getClockTimer(),
        clockTimerElement = "<div class='listClockTime'>" + clockTimer + "</div>";

        // manual input 
        let manualTime1 = document.getElementById("manual-entry-1").value,
        manualTime2 = document.getElementById("manual-entry-2").value,
        chosenDateNoYear = document.getElementById("datepicker").value,
        chosenYear = $( "#datepicker" ).datepicker( "getDate" ).getFullYear(),
        currentYear = (new Date()).getFullYear();

        // toggle billable hours 
        let billingToggle = checkBillingToggle();

        // check input mode used, returns true if manual 
        let manualInputMode = checkManualInputModeToggle();

        // begin builing li components 
        let deleteLiIcon = "<span><i class='fa fa-trash'></i></span>";
        let appendTimeIcon = "<span><i class='fa fa-play'></i></span>";

        let titleAndColor = projectNameAndColor();
        let projtitle = titleAndColor[0];
        let iconColor = titleAndColor[1];

        let projectNameIcon = "<div class='projIcon'><h6 style='background-color:" + iconColor + "'" + ">" + projtitle + "</h6></div>";
        let projectBillIcon = "<div class='billIcon noselect'>$</div>";

        // create a new li and add to ul
        $("ul").append("<li class='listItem ui-sortable-handle' style='display: list-item'>" + task + "   " + projectNameIcon + "<div class='listIconsRight'>" + projectBillIcon + clockTimerElement + appendTimeIcon + deleteLiIcon + "</div>" + "</li>");

        // show lis + reset inputs 
        showLis();
        resetInputs();
    } 
}

// initialize append 
let testappend = document.getElementById('testappend');

testappend.addEventListener('click', () => {
    appendToList();
});


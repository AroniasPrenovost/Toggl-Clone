import {dragDropList} from './modules/dragDrop';
import {listSearch} from './modules/dropListSearch';
import {appendTaskToInput, deleteListItem} from './modules/liDeleteHide';
import {toggleBilling, checkBillingToggle} from './modules/toggleBilling';
import {startTimer, trackListItemTime} from './modules/timerComponents';
import {toggleProjectDropdown, filterFunction, filterEntry, appendProjToButton} from './modules/dropDownButton';
import {resetInputs, showLis, getRandomColor, changeProjectNameColors, determineProjectTagColors, projectNameAndColor} from './modules/listInteractions';
import {getTaskInput, checkTaskInput, validateTimerModeEntry, checkAssignedProject} from './modules/timerInputValidators';

// import {} from './modules/traverseList';
import {generateTodaysDate, generateCurrentTime, checkManualInputModeToggle, manualInputs} from './modules/toggleInputs';
import {genDigitalTime, digitalTimeToWord, digitalTimeToSeconds, secondsToDigital, wordedTimeToSeconds} from './modules/timeConversion';

// ----- Instant Functions ----- // 
listSearch(); 

// drag drop 
dragDropList();
toggleBilling();

// li items delete, hide 
appendTaskToInput();
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
        let clockTimer = genDigitalTime(),
        clockTimerElement = "<div class='listClockTime'>" + clockTimer + "</div>";

        // manual input 
        let currentYear = (new Date()).getFullYear(),
        assumeTodaysDate = generateTodaysDate(),
        currentTime = generateCurrentTime();

        // grab inputs if time entry enabled
        if (checkManualInputModeToggle() == true) {
           var manInputVals = manualInputs();
           // manInputVals[3])
        }

        // toggle billable hours 
        let billingToggle = checkBillingToggle();

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


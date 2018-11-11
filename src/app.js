import {dragDropList} from './modules/dragDrop';
import {listSearch} from './modules/dropListSearch';
import {appendTaskToInput, deleteListItem} from './modules/liDeleteHide';
import {toggleBilling, checkBillingToggle} from './modules/toggleBilling';
import {startTimer, trackListItemTime} from './modules/timerComponents';
import {toggleProjectDropdown, filterFunction, filterEntry, appendProjToButton} from './modules/dropDownButton';
import {resetInputs, showLis, getRandomColor, changeProjectNameColors, determineProjectTagColors, projectNameAndColor} from './modules/listInteractions';
import {getTaskInput, checkTaskInput, validateTimerModeEntry, validateManualModeEntry, checkAssignedProject} from './modules/timerInputValidators';
import {generateTodaysDate, generateCurrentTime, checkManualInput, getManualInputs} from './modules/toggleInputs';
import {genDigitalTime, digitalTimeToWord, digitalTimeToSeconds, secondsToDigital, wordedTimeToSeconds} from './modules/timeConversion';
import {timesToSeconds, genTimerModeManualTimeStamp} from './modules/timeStampConvert';
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

appendProjToButton();

const appendToList = () => {

    // check task and project is assigned 
    if (checkTaskInput() == true && checkAssignedProject() === true) {

        // if timer mode enabled and digital entry invalid 
        if (checkManualInput() == false && validateTimerModeEntry() === false) {
            return false;     
        }

        // if manual entry enabled and manual entry invalid 
        if (checkManualInput() === true && validateManualModeEntry() === false) {
           return false; 
        }

        var timeStamp = '';
        var clockTimer = ''; 
        // if timer mode enabled and digital entry valid
        if (checkManualInput() == false && validateTimerModeEntry() === true) {
             
             timeStamp = genTimerModeManualTimeStamp();

             // grab digital time 
             clockTimer = genDigitalTime();
        }
            
        // if manual entry enabled and manual entry valid 
        if (checkManualInput() === true && validateManualModeEntry() === true) {
           var manInputVals = getManualInputs();

            // create timestamp
            timeStamp = manInputVals[0] + " - " + manInputVals[1];
          
            // get seconds difference, and then convert to digital time 
            manInputVals = timesToSeconds(manInputVals[0], manInputVals[1]);
            clockTimer = secondsToDigital(manInputVals);
        }

        // get task input  
        var task = getTaskInput(); 

        // create digital time component 
        var clockTimerElement = "<div class='listClockTime'>" + clockTimer + "</div>";

        // current time  
        let currentYear = (new Date()).getFullYear(),
        assumeTodaysDate = generateTodaysDate(),
        currentTime = generateCurrentTime();

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

        let taskTimeStamp = "<div class='timestamp'>" + timeStamp + "</div>";

        // list item data  
        let listItemData = task + "   " + projectNameIcon + "<div class='listIconsRight'>" + projectBillIcon + taskTimeStamp + clockTimerElement + appendTimeIcon + deleteLiIcon + "</div>";
     
        // declare node, add classes + list data  
        var node = document.createElement("li"); 
        let classesToAdd = [ 'listItem', 'ui-sortable-handle' ];
        node.classList.add(...classesToAdd);
        node.innerHTML = listItemData;               

        // add element to list item 
        document.getElementById("projects").appendChild(node);

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

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

        // generate current time  
        let currentYear = (new Date()).getFullYear(),
        assumeTodaysDate = generateTodaysDate(),
        currentTime = generateCurrentTime();

        // begin builing list item components

        // get task and create item  
        const task = getTaskInput(); 
        const taskNode = document.createElement("div");
              taskNode.className = "listTask";
              taskNode.innerHTML = task;

        // create digital time component 
        const clockTimerElementNode = document.createElement("div");
              clockTimerElementNode.className = "listClockTime";
              clockTimerElementNode.innerHTML = clockTimer;

        // toggle billable hours 
        let billingToggle = checkBillingToggle();

        let deleteLiIcon = "<span><i class='fa fa-trash'></i></span>";
        let appendTimeIcon = "<span><i class='fa fa-play'></i></span>";

        let titleAndColor = projectNameAndColor();
        let projtitle = titleAndColor[0];
        let iconColor = titleAndColor[1];

        let projectNameIcon = "<div class='projIcon'><h6 style='background-color:" + iconColor + "'" + ">" + projtitle + "</h6></div>";
        let projectBillIcon = "<div class='billIcon noselect'>$</div>";

        const taskTimeStampNode = document.createElement("div");
              taskTimeStampNode.className = "timestamp";
              taskTimeStampNode.innerHTML = timeStamp;

        // list item data  
        let listItemData = ''; //task + "   " + projectNameIcon + projectBillIcon + taskTimeStamp + "<div class='listIconsRight'>" + clockTimerElement + appendTimeIcon + deleteLiIcon + "</div>";
        
       
        // declare new li node, add list data  
        var node = document.createElement("li"); 
        let classesToAdd = [ 'listItem', 'ui-sortable-handle' ];
        node.classList.add(...classesToAdd);


        // node.innerHTML = listItemData;

        // add list items to li node                
        node.appendChild(taskNode);


        node.appendChild(taskTimeStampNode);
        
        node.appendChild(clockTimerElementNode);

        // add li element to list 
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

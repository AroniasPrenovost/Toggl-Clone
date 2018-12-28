import {createListItemNode} from './modules/createListEntryNode';
import {dragDropList} from './modules/dragDrop';
import {listSearch} from './modules/dropListSearch';
import {appendTaskToInput} from './modules/liDeleteHide';
import {toggleBilling, checkBillingToggle} from './modules/toggleBilling';
import {startTimer, trackListItemTime} from './modules/timerComponents';
import {toggleProjectDropdown, filterFunction, filterEntry, appendProjToButton} from './modules/dropDownButton';
import {getProjectName, getRandomColor, changeProjectNameColors, determineProjectTagColors, projectNameAndColor} from './modules/projectNameBadge';
import {resetInputs, showLis} from './modules/resetInputs';
import {getTaskInput, checkTaskInput, validateTimerModeEntry, validateManualModeEntry, checkAssignedProject} from './modules/timerInputValidators';
import {generateTodaysDate, convertToAlternateDate, dateToShorthand, generateCurrentTime, checkManualInput, getManualInputs} from './modules/toggleInputs';
import {genDigitalTime, digitalTimeToWord, digitalTimeToSeconds, secondsToDigital, wordedTimeToSeconds} from './modules/timeConversion';
import {timesToSeconds, genTimerModeManualTimeStamp} from './modules/timeStampConvert';
import {containerIdMatch, compareDates, containerIdOrder, populateContainersTimeSum} from './modules/dateContainer';
import {buildListFromJSON, exportListEntries} from './modules/buildListFromJSON';
import {JSONToCSV} from './modules/csvExport';

listSearch(); 

// drag drop 
dragDropList();
toggleBilling();

// li items delete, hide 
appendTaskToInput();
// deleteListItem();
trackListItemTime();

// choose project dropdown 
toggleProjectDropdown();
filterFunction();
filterEntry();

appendProjToButton();

// generate li from JSON
buildListFromJSON();

// append + combine new entries w/ imported JSON
var listEntries = [];
var JSONimport = exportListEntries();
for (let value of JSONimport) {
    listEntries.push(value);
}

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

        // list container 
        var taskListContainer = document.getElementById("taskList");

        // date and time elements to be generated 
        var timeStamp = '',
        dateStamp = '',
        alternateDateFormat = '',
        dateShorthand = '',
        clockTimer = '',
        seconds = '';

        // if timer mode enabled and digital entry valid
        if (checkManualInput() == false && validateTimerModeEntry() === true) {
            var manualInputValues = getManualInputs();

            // 4:43 pm - 5:03 pm format 
            timeStamp = genTimerModeManualTimeStamp();

            // mm/dd/yyyy format 
            dateStamp = generateTodaysDate();

            // yyyy-mm-dd format 
            alternateDateFormat = convertToAlternateDate(dateStamp);

            // 'Wed, 28 Nov, 2017' format 
            dateShorthand = dateToShorthand(alternateDateFormat);

            // grab digital time 
            clockTimer = genDigitalTime();

            // seconds format
            seconds = digitalTimeToSeconds(clockTimer);
        }

        // if manual entry enabled and manual entry valid 
        if (checkManualInput() === true && validateManualModeEntry() === true) {
            
            var manualInputValues = getManualInputs();

            // create timestamp
            timeStamp = manualInputValues[0] + " - " + manualInputValues[1];

            // mm/dd/yyyy format if entry is present day 
            if (manualInputValues[2] === 'Today') {
                dateStamp = generateTodaysDate();
            } else {
                dateStamp = manualInputValues[2] + '/' + manualInputValues[3];
            }

            // yyyy-mm-dd format 
            alternateDateFormat = convertToAlternateDate(dateStamp);

            // 'Wed, 28 Nov, 2017' format 
            dateShorthand = dateToShorthand(alternateDateFormat);

            // get seconds difference, and then convert to digital time 
            let manualTimeStamps  = timesToSeconds(manualInputValues[0], manualInputValues[1]);

            clockTimer = secondsToDigital(manualTimeStamps);

            seconds = digitalTimeToSeconds(clockTimer);
        }

        // generate current time  
        let currentYear = (new Date()).getFullYear(),
        assumeTodaysDate = generateTodaysDate(),
        currentTime = generateCurrentTime();

        // get currentYear
        const task = getTaskInput(); 

        // get project name 
        let projTitle = getProjectName(); 

        // toggle billable hours 
        let billingToggle = checkBillingToggle();

        // item entry time in milliseconds, based on unix timestap 
        let entryTime = Date.now(); 

        // id user name 
        // to do... 

        // build list data object 
        var taskEntry = {
            task_name: task,  
            project_name: projTitle,
            time_stamp: timeStamp,
            digital_time: clockTimer,
            total_seconds: seconds, 
            date_stamp: dateStamp,
            alternate_date: alternateDateFormat,
            short_date: dateShorthand, 
            billable: billingToggle,
            created_on: assumeTodaysDate,
            current_year: currentYear,
            entry_time: entryTime
        };

        // build HTML li component for new task entry
        let node = createListItemNode(taskEntry);

        // track new entry in list
        listEntries.push(taskEntry);

        // re-order listEntries chronologically by date stamp, in descending order  
        listEntries.sort((a,b) => new Date(a.alternate_date).getTime() - new Date(b.alternate_date).getTime());
        listEntries.reverse();

        console.log(listEntries);

        // place in session storage 
        sessionStorage.setItem('listEntries', JSON.stringify(listEntries));

        // to retrieve
        // var retrievedObject = sessionStorage.getItem('taskEntry');
        // console.log('retrievedObject: ', JSON.parse(retrievedObject));

        // add new list item to page, determine node placement 

        if (containerIdMatch(dateStamp) === false) { 

            // create task list container for calendar day (li node)
            const dateContainer = document.createElement("div"); 
            let dateContainerClasses = [ 'dateContainer', 'dateContainerStyle' ];
            dateContainer.classList.add(...dateContainerClasses);
            dateContainer.id = dateStamp; // id is day's date 
            dateContainer.draggable = false;

            // check if dateshorthand year, if current, hide date 
            let appearDate = '';
            let enteredYear = Number(dateShorthand.substr(dateShorthand.length - 4));

            if (currentYear != enteredYear) {
                appearDate = dateShorthand;
            } else {
                appearDate = dateShorthand.substring(0, dateShorthand.lastIndexOf(","));
            }

            // list date container header
            var dateDivContainer = document.createElement('div');
            dateDivContainer.classList.add('dateDivContainer'); 

            var h = document.createElement('H3')                
            var t = document.createTextNode(appearDate); 
            h.classList.add('dateHeader');    
            h.appendChild(t);

            var b = document.createElement('H3') 
            var u = document.createTextNode('placeholder'); // will become sum of seconds
            b.id = alternateDateFormat;
            b.classList.add('dateTimeMax');

            b.appendChild(u);    

            dateDivContainer.appendChild(h);
            dateDivContainer.appendChild(b);
            dateContainer.appendChild(dateDivContainer);

            // create project list 
            const projTaskListNode = document.createElement("ul"); 
            let taskListClasses = [ 'droppable-area', 'ui-sortable' ];
            projTaskListNode.classList.add(...taskListClasses);
            projTaskListNode.id = 'projects';

            // add li to ul
            projTaskListNode.appendChild(node); 

            // add ul to newly created div container  
            dateContainer.appendChild(projTaskListNode);

            // ids apppearing on the page
            let idlists = containerIdOrder(dateStamp);
            let alternateidlist = [];

            if (idlists) {
                for (let value of idlists) {
                  alternateidlist.push(convertToAlternateDate(value));
                }
            }

            // if first entry
            if (!idlists) {
                taskListContainer.appendChild(dateContainer);
                showLis();
                resetInputs();
                // match {week date : total_seconds} and find sum
                populateContainersTimeSum(listEntries);
                return false; 
            } else {

                // if 2 elements 
                if (idlists.length === 1) {

                    let arg1 = alternateidlist[0];
                    let arg2 = alternateDateFormat;

                    let dateCompare = compareDates(arg1, arg2);

                    if (dateCompare === 'item_1_more_recent') {
                        taskListContainer.appendChild(dateContainer);  
                        showLis();
                        resetInputs();      
                    }

                    if (dateCompare === 'item_2_more_recent') {
                        taskListContainer.insertBefore(dateContainer, taskListContainer.childNodes[0]);
                        showLis();
                        resetInputs();
                    } 
                }

                // if 1 > elements exist, find valid entry position    
                if (idlists.length > 1) {

                    // if new entry is most recent
                    let firstEntry = alternateidlist[0];
                    let thisEntry = alternateDateFormat;
                    let firstCompare = compareDates(firstEntry, thisEntry);

                    if (firstCompare === 'item_2_more_recent') {
                        taskListContainer.insertBefore(dateContainer, taskListContainer.childNodes[0]);
                        showLis();
                        resetInputs();
                    }

                    var newEntry = convertToAlternateDate(dateContainer.id);
                    for (var b = 0; b < alternateidlist.length; b++) {
                        let itemCompared = alternateidlist[b];
                        let dateCompare = compareDates(itemCompared, newEntry);

                        let nextItemCompare = alternateidlist[b+1];
                        let nextDateCompare = compareDates(nextItemCompare, newEntry);
                        if (dateCompare === 'item_1_more_recent' && nextDateCompare === 'item_2_more_recent') {
                                taskListContainer.children[b].insertAdjacentElement("afterEnd", dateContainer);
                                showLis();
                                resetInputs();
                        }   
                    } 
                }
                populateContainersTimeSum(listEntries); 
            }
        }

        // if container id match exists, attach node to match 
        if (containerIdMatch(dateStamp) === true) {
        let listMatch = document.getElementById(dateStamp);
            listMatch.appendChild(node);
            showLis();
            resetInputs();
            populateContainersTimeSum(listEntries); 
        }  
    } 
}

// remove item from list  
$('.fa-trash').click(function() {
    let index = $('.fa-trash').index(this);
    // to do ... 
    
});

// resume task 
$('.fa-play').click(function() {
    let index = $('.fa-play').index(this);
    // to do ... 

});
 

// export list data to csv 
let excelExport = document.getElementById('excel-export');
    excelExport.addEventListener('click', () => {
    var timeSheetNameTitle = "Time Report - " + generateTodaysDate() + ' ' + generateCurrentTime();
    JSONToCSV(listEntries, timeSheetNameTitle, true);
});


// initialize append 
let append = document.getElementById('append');
    append.addEventListener('click', () => {
        appendToList();
});

// test session storage  
let testsessiondata = document.getElementById('session-store');
    testsessiondata.addEventListener('click', () => {
        const retrieveObj = sessionStorage.getItem('listEntries');
        //console.log(exportListEntries());
});
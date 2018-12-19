import json from '../../data/testData.json';
import {createListItemNode} from './createListEntryNode';
import {containerIdMatch, compareDates, containerIdOrder, populateContainersTimeSum} from './dateContainer';
import {generateTodaysDate, generateCurrentTime, convertToAlternateDate} from './toggleInputs'; 
  
// build list to calculate 
var listEntries = [];

const buildListFromJSON = () => {

	// loop through array 
	for (let value of json) {

		// build HTML li component for new task entry
        let node = createListItemNode(value);

        // track new entry in list
        listEntries.push(value);

        // re-order listEntries chronologically by date stamp, in descending order  
        listEntries.sort((a,b) => new Date(a.alternate_date).getTime() - new Date(b.alternate_date).getTime());
        listEntries.reverse();
 
		// list container 
		var taskListContainer = document.getElementById("taskList");
 
        // if no matching container id 
        if (containerIdMatch(value.date_stamp) === false) { 

            // create task list container for calendar day (li node)
            const dateContainer = document.createElement("div"); 
            let dateContainerClasses = [ 'dateContainer', 'dateContainerStyle' ];
            dateContainer.classList.add(...dateContainerClasses);
            dateContainer.id = value.date_stamp; // id is day's date 
            dateContainer.draggable = false;

            // check if dateshorthand year, if current, hide date 
            let appearDate = '';
            let enteredYear = Number(value.short_date.substr(value.short_date.length - 4));

			// generate current time  
			let currentYear = (new Date()).getFullYear(),
			assumeTodaysDate = generateTodaysDate(),
			currentTime = generateCurrentTime();

            if (currentYear != enteredYear) {
                appearDate = value.short_date;
            } else {
                appearDate = value.short_date.substring(0, value.short_date.lastIndexOf(","));
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
            b.id = value.alternate_date;
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
            let idlists = containerIdOrder(value.date_stamp);
            let alternateidlist = [];

            if (idlists) {
                for (let value of idlists) {
                  alternateidlist.push(convertToAlternateDate(value));
                }
            }

            // if first entry
            if (!idlists) {
                taskListContainer.appendChild(dateContainer);

                // match {week date : total_seconds} and find sum
                populateContainersTimeSum(listEntries);
               // return false; 
            } else {

                // if 2 elements 
                if (idlists.length === 1) {

                    let arg1 = alternateidlist[0];
                    let arg2 = value.alternate_date; // alternateDateFormat;

                    let dateCompare = compareDates(arg1, arg2);

                    if (dateCompare === 'item_1_more_recent') {
                        taskListContainer.appendChild(dateContainer);   
                    }

                    if (dateCompare === 'item_2_more_recent') {
                        taskListContainer.insertBefore(dateContainer, taskListContainer.childNodes[0]);
                    } 
                }

                // if 1 > elements exist, find valid entry position    
                if (idlists.length > 1) {
                    var newEntry = convertToAlternateDate(dateContainer.id);
                    for (var b = 0; b < alternateidlist.length; b++) {
                        let itemCompared = alternateidlist[b];
                        let dateCompare = compareDates(itemCompared, newEntry);

                        let nextItemCompare = alternateidlist[b+1];
                        let nextDateCompare = compareDates(nextItemCompare, newEntry);
                        if (dateCompare === 'item_1_more_recent' && nextDateCompare === 'item_2_more_recent') {
                                taskListContainer.children[b].insertAdjacentElement("afterEnd", dateContainer);
                        }   
                    } 
                }
                populateContainersTimeSum(listEntries); 
            }
        }

        // if container id match exists, attach node to match 
        if (containerIdMatch(value.date_stamp) === true) {
        let listMatch = document.getElementById(value.date_stamp);
            listMatch.appendChild(node);
            populateContainersTimeSum(listEntries); 
        }
	}
}

const exportListEntries = () => {
    return listEntries; 
}

export {buildListFromJSON, exportListEntries};
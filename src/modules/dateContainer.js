
import {secondsToDigital, digitalTimeToWord} from "./timeConversion";

// check if input dateStamp matches current container Ids 
function containerIdMatch(str) {
  // grab all divs with container class 
  let dateContainerDivs = document.getElementsByClassName('dateContainer');
  let arrLength = dateContainerDivs.length;
  let divIds = [];

  // loop through ids 
  for (let i = 0; i < arrLength; i++) {
    divIds.push(dateContainerDivs[i].id);
  }

  if (divIds.indexOf(str) > -1) {
    return true;
  } else {
    return false;
  }
}

// args requires '2013-11-01', '2016-11-01' (alternateDateFormat)
function compareDates (arg1, arg2) {
  if (arg1 === arg2) {
    return false;
  } else if (arg1 > arg2) {
    return 'item_1_more_recent';  
  } else {
    return 'item_2_more_recent';  
  }
}

// get current ids 
function containerIdOrder(str) {
  // get divs with container class 
  let dateContainerids = document.getElementsByClassName('dateContainer');
  let arrLength = dateContainerids.length;
  let ids = [];

  // grab container ids
  for (var i = 0; i < arrLength; i++) {
    ids.push(dateContainerids[i].id);
  }
  if (ids.length != 0) {
    return ids; 
  }
}

// get sum of task time for each each date id 
// '{ alternate_date: '2018-12-05', total_seconds: 232 }'
function populateContainersTimeSum(obj) {
  let data = Object.values(obj.reduce((c, {alternate_date, total_seconds}) => {
  c[alternate_date] = c[alternate_date] || {alternate_date,total_seconds: 0};
  c[alternate_date].total_seconds += total_seconds;
  return c;
  }, {}));

  for (let value of data) {
    let idDate = value.alternate_date.toString(); 
    let idTime = value.total_seconds.toString();
    let containerSpot = document.getElementById(idDate);

    // converts "36082" seconds to "10 : 01 : 22" 
    let idTimeDigital = secondsToDigital(idTime);

    // converts "10 : 01 : 22" to "10 hours 1 minute 22 seconds"
    let idTimeWorded = digitalTimeToWord(idTimeDigital);

        containerSpot.innerHTML = idTimeWorded;  
  }
}

export {containerIdMatch, compareDates, containerIdOrder, populateContainersTimeSum}; 



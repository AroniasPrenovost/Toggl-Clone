
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


function getSumOfDayTime(obj) {

// grab an alternate object key if you wish 
  var alternateDateStamps = [];
  for (var i = 0; i < obj.length; i++) {
    if (alternateDateStamps.indexOf(obj[i].alternate_date) > -1) {
      continue;
    } else { // doesn't exist in array
      alternateDateStamps.push(obj[i].alternate_date);
    }
  }

  var idTimeSumObj = [],
      key,
      total_time = '',
      newObj = '',
      idSumFlag = '',
      removePrev = false;

  for (var t = 0; t < obj.length; t++) {
    if (t === 0) {
      key = obj[t].alternate_date;
      total_time = obj[t].total_seconds;
    }
    if (t > 0) {
      if (obj[t].alternate_date === obj[t - 1].alternate_date) {
        if (idSumFlag) {
          total_time = idSumFlag + obj[t - 1].total_seconds;
          idSumFlag = total_time;
        }
        if (!idSumFlag) {
          total_time = obj[t].total_seconds + obj[t - 1].total_seconds;
          idSumFlag = total_time;
        }
        removePrev = true;
      } else {
        total_time = obj[t].total_seconds;
        idSumFlag = 0;
      }
    }
    key = obj[t].alternate_date;
    newObj = { [key]: total_time };
    if (removePrev === true) {
      idTimeSumObj.pop();
    }
    removePrev = false;
    idTimeSumObj.push(newObj)
  }
  return idTimeSumObj;
}

function populateContainersTimeSum(obj) {
  let data = getSumOfDayTime(obj);

  var alternateDateStamps = Object.keys(data);

  for (var i = 0; i < data[i].length; i++) {
    console.log(data[i])
    var containerSpot = document.getElementsById(data[i]);
        containerSpot.innerHTML = alternateDateStamps[i];
  }
}

export {containerIdMatch, compareDates, containerIdOrder, getSumOfDayTime, populateContainersTimeSum}; 



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
    alert(arg1 + '   ' + arg2)
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

export {containerIdMatch, compareDates, containerIdOrder}; 



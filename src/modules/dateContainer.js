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

// pass args as "2013-11-01", "2016-11-01" - alternateDateFormat
function compareDates (arg1, arg2) {
 
  if (arg1 === arg2) {
    return false;
  } else if (arg1 > arg2) {
    return 'first';
  } else {
    return 'second';
  }

}

// match container instance to id/timestamp 
function containerIdOrder(str) {

    // grab all divs with container class 
    let dateContainerids = document.getElementsByClassName('dateContainer');
    let arrLength = dateContainerids.length;
    let ids = [];

    // grab container ids
    for (var i = 0; i < arrLength; i++) {
        ids.push(dateContainerids[i].id);
    }

    // first item 
    if (ids.length === 1) {
      return false;
    }

    // second time 
    if (ids.length === 2) {

      // find more recent date  
      let recentDate = compareDates(ids[0], ids[1]);

      // if first container item most recent  
      if (recentDate === 'first') {
        return false; 
      }
      
      // if second container item most recent
      if (recentDate === 'second') {
        return 'second item more recent';
      }

    }

    // 3 or more  
    if (ids.length > 2) {
    
      // grab last item in array and shorten 
      let newDateEntry = ids.pop();

      // compare to other ids
      for (var i = 0; i < ids.length; i++) {
        let check = compareDates(ids[i], newDateEntry);

        if (check === 'second') {
       //   return [ids[i], 'yes'];
        }
     }

    }
  }

export {containerIdMatch, containerIdOrder}; 



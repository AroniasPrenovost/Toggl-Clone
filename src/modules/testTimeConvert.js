function getRawNum(str) {
  // grab first two characters  
  let a = 4,
    b = 1;

  if (str.length === 8) {
    a = 5,
      b = 2;
  }

  let s = str.substring(0, a);

  if (s.charAt(b) !== ':') {
    return false;
  } else {
    s = s.slice(0, b) + s.slice(b + 1);
    return s;
  }
}


function timesToSeconds(str1, str2) {
  let start = str1,
    	end = str2;

  // add date and convert to unix timestamp 
  start = new Date('01.01.1970 ' + start).getTime() / 1000;
  end = new Date('01.01.1970 ' + end).getTime() / 1000;

  // time diff in minutes
  let mins = Math.abs(end - start) / 60;
  const dayMinutes = 24 * 60;

  // if PM - PM or AM - AM left is larger 
  // compare start time and end time 
  let rawNum1 = getRawNum(str1),
    rawNum2 = getRawNum(str2);

  // create + check AM/PM variables
  let ampm1 = str1.toLowerCase().substr(str1.length - 3).trim();
  let ampm2 = str2.toLowerCase().substr(str2.length - 3).trim();

  // check if hour matches 
  let hour1 = + str1.split(":")[0];
  let hour2 = str2.split(":")[0];
  let min1 = str1.split(':').pop();
  let min2 = str2.split(':').pop();

  // am/pm is the same and start time later than end time 
  if (ampm1 === ampm2) {
    if (Number(rawNum1) > Number(rawNum2)) {
      if (Number(hour1) === Number(hour2)) {
        if (min1 > min2) {
          let leftoverMins = min1.substring(0, min2.length - 2).trim();
          leftoverMins = 60 - Number(leftoverMins);
          let addedMins = min2.substring(0, min2.length - 2).trim();

          let totalMins = Number(dayMinutes) + Number(leftoverMins) + Number(addedMins);
          let seconds = totalMins * 60;
          console.log('flag __0__')
          return seconds;
        }
      }

      let minuteDiff = dayMinutes - mins;
      let thismins = minuteDiff + dayMinutes; // + 24 hours
      seconds = thismins * 60;
      seconds = seconds / 2;

      return seconds + "   __|| seconds";
    } else if (Number(rawNum1) === Number(rawNum2)) { // entry time is zero 
      let seconds = 0;
      return seconds;
      // return false 
    } else {
      // proceed as normal 
      let seconds = mins * 60;
      return seconds + " ___";
    }
  }

  // am/pm are different and start time earlier than end time 
  if (ampm1 === 'pm' && ampm2 === 'am') {
    if (Number(rawNum1) < Number(rawNum2)) {

      // THIS NUMBER THING IS VALID 
      str1 = str1.slice(0, -2) + 'am';
      str2 = str2.slice(0, -2) + 'pm';

      let start = str1,
        end = str2;

      // add date and convert to unix timestamp 
      start = new Date('01.01.1970 ' + start).getTime() / 1000;
      end = new Date('01.01.1970 ' + end).getTime() / 1000;

      let mins = Math.abs(end - start) / 60,
        seconds = mins * 60;
      console.log(seconds)
      return seconds;
    }
  }




  // check to see if hour comparison even matters 
  if (ampm1 === 'am' && ampm2 === 'pm') { // ---
    if (Number(hour1) < Number(hour2)) {

      let mins = Math.abs(end - start) / 60
      let seconds = mins * 60 + "  " + 'test';
      return seconds;
    }
    if (Number(hour1) > Number(hour2)) { // -----

      let mins = Math.abs(end - start) / 60
      let seconds = mins * 60 + "  " + 'BEST';
      return seconds;
    }
  }




  return seconds;
}

timesToSeconds("12:40 AM", "12:10 AM");

// timesToSeconds("12:40 AM", "12:10 AM");
// 1470
// 24:30:00

// timesToSeconds("2:02 AM", "12:09 AM");
// 
// 21:59:00

// timesToSeconds("2:02 PM", "6:01 AM");
// 57540
// 15:59:00.


// timesToSeconds("4:02 AM", "3:01 AM");
// 84570 secs
// 
// 23:29:30


// timesToSeconds("2:01 PM", "4:01 AM");
// 50400 secs
// 14 hrs
// 13:59:00 


// timesToSeconds("2:01 AM", "4:01 PM");
// 50400 secs
// 14 hrs
// 13:59:00

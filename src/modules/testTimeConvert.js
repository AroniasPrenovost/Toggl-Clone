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
  let mins = Math.abs(end - start) / 60,
    dayMinutes = 24 * 60;

  // if PM - PM or AM - AM left is larger 
  // compare start time and end time 
  let rawNum1 = getRawNum(str1),
    rawNum2 = getRawNum(str2);

  // create + check AM/PM variables
  let ampm1 = str1.toLowerCase().substr(str1.length - 3).trim();
  let ampm2 = str2.toLowerCase().substr(str2.length - 3).trim();

  // pm/pm is true and start time later than end time [works]
  if (ampm1 === 'pm' && ampm2 === 'pm') {
    if (Number(rawNum1) > Number(rawNum2)) {
      let minuteDiff = dayMinutes - mins;
      let thismins = minuteDiff + dayMinutes; // + 24 hours
      seconds = thismins * 60 / 2;
      return seconds;
    } else if (Number(rawNum1) === Number(rawNum2)) { // entry time is zero 
      let seconds = dayMinutes * 60;
      return seconds;
    } else {
      // proceed as normal 
      let seconds = mins * 60;
      return seconds;
    }
  }

  // am/am is true 
  if (ampm1 === 'am' && ampm2 === 'am') {
    if (Number(rawNum1) > Number(rawNum2)) {
      let minuteDiff = dayMinutes - mins;
      let thismins = minuteDiff + dayMinutes; // + 24 hours
      seconds = thismins * 60 / 2;
      return seconds;
    } else if (Number(rawNum1) === Number(rawNum2)) { // entry time is zero 
      let seconds = dayMinutes * 60;
      return seconds;
      // return false 
    } else {
      // proceed as normal 
      let seconds = mins * 60;
      return seconds;
    }
  }

  // am/pm are different and start time earlier than end time 
  if (ampm1 === 'pm' && ampm2 === 'am') {
    // if time matches 
    if (Number(rawNum1) === Number(rawNum2)) {
      let seconds = dayMinutes * 60 / 2;
      return seconds;
    }

    if (Number(rawNum1) < Number(rawNum2)) {

      str1 = str1.slice(0, -2) + 'am';
      str2 = str2.slice(0, -2) + 'pm';

      let start = str1,
        end = str2;

      // add date and convert to unix timestamp 
      start = new Date('01.01.1970 ' + start).getTime() / 1000;
      end = new Date('01.01.1970 ' + end).getTime() / 1000;

      let mins = Math.abs(end - start) / 60,
        seconds = mins * 60;
      return seconds;
    }
  }
  if (ampm1 === 'am' && ampm2 === 'pm') {
    // if time matches 
    if (Number(rawNum1) === Number(rawNum2)) {
      let seconds = dayMinutes * 60 / 2;
      return seconds;
    }

    if (Number(rawNum1) < Number(rawNum2)) {

      str1 = str1.slice(0, -2) + 'am';
      str2 = str2.slice(0, -2) + 'pm';

      let start = str1,
        end = str2;

      // add date and convert to unix timestamp 
      start = new Date('01.01.1970 ' + start).getTime() / 1000;
      end = new Date('01.01.1970 ' + end).getTime() / 1000;

      let mins = Math.abs(end - start) / 60,
        seconds = mins * 60;
      return seconds;
    }
  }
  // return seconds;
}

timesToSeconds("12:06 PM", "12:09 PM");

// ("4:02 AM", "3:01 AM");
// 84570 
// 23.491667

// ("2:02 PM", "6:01 AM");
// 57540
// 15:59:00


// ("2:02 AM", "6:01 AM");
// 3.9833333
// 14340

// ("2:00 PM", "6:00 PM");
// 14400
// 4:00:00 


// ("2:02 PM", "2:10 PM");
// 480
// 0 : 08: 00 
// 8 mins 

// ("2:06 PM", "2:04 PM");
// 86340
//

//("12:06 PM", "12:09 PM");
// 180

// ("12:06 PM", "12:04 PM");
// 86340


// ("11:12 PM", "11:11 PM");


// ("11:12 PM", "11:13 PM");
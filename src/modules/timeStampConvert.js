function getRawNum(str) {
  // grab first two characters  
  let a = 4,
    b = 1;

  if (str.length === 8) {
    a = 5, b = 2;
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
  start = new Date(`01.01.1970 ${start}`).getTime() / 1000;
  end = new Date(`01.01.1970 ${end}`).getTime() / 1000;

  // time diff in minutes
  let seconds = 0;
  let mins = Math.abs(end - start) / 60,
    dayMinutes = 24 * 60;

  // if PM - PM or AM - AM left is larger 
  // compare start time and end time 
  const rawNum1 = getRawNum(str1), rawNum2 = getRawNum(str2);

  // create + check AM/PM variables
  const ampm1 = str1.toLowerCase().substr(str1.length - 3).trim();
  const ampm2 = str2.toLowerCase().substr(str2.length - 3).trim();

  // pm/pm is true and start time later than end time [works]
  if (ampm1 === 'pm' && ampm2 === 'pm') {
    if (Number(rawNum1) > Number(rawNum2)) {
      const minuteDiff = dayMinutes - mins;
      const thismins = minuteDiff + dayMinutes; // + 24 hours
      seconds = thismins * 60 / 2;
      return seconds;
    } else if (Number(rawNum1) === Number(rawNum2)) { // entry time is zero 
      seconds = dayMinutes * 60;
      return seconds;
    } else {
      // proceed as normal 
      seconds = mins * 60;
      return seconds;
    }
  }

  // am/am is true 
  if (ampm1 === 'am' && ampm2 === 'am') {
    if (Number(rawNum1) > Number(rawNum2)) {
      const minuteDiff = dayMinutes - mins;
      const thismins = minuteDiff + dayMinutes; // + 24 hours
      // alert(thismins)
      seconds = thismins * 60 / 2;
      return `${seconds} __test `;
    } else if (Number(rawNum1) === Number(rawNum2)) { // entry time is zero 
      seconds = dayMinutes * 60;
      return seconds;
      // return false 
    } else {
      // proceed as normal 
      seconds = mins * 60;
      return seconds;
    }
  }

  // am/pm are different and start time earlier than end time 
  if (ampm1 === 'pm' && ampm2 === 'am') {
    if (Number(rawNum1) < Number(rawNum2)) {

      str1 = `${str1.slice(0, -2)}am`;
      str2 = `${str2.slice(0, -2)}pm`;

      start = str1, end = str2;

      // add date and convert to unix timestamp 
      start = new Date(`01.01.1970 ${start}`).getTime() / 1000;
      end = new Date(`01.01.1970 ${end}`).getTime() / 1000;

      mins = Math.abs(end - start) / 60, seconds = mins * 60;
      return seconds;
    }
  }

  if (ampm1 === 'am' && ampm2 === 'pm') {
    // if time matches 
    if (rawNum1 === rawNum2) {
      seconds = dayMinutes * 60 / 2;
      return seconds;
    }

    if (rawNum1 < rawNum2) {
      str1 = `${str1.slice(0, -2)}am`;
      str2 = `${str2.slice(0, -2)}pm`;

      start = str1, end = str2;

      // add date and convert to unix timestamp 
      start = new Date(`01.01.1970 ${start}`).getTime() / 1000;
      end = new Date(`01.01.1970 ${end}`).getTime() / 1000;

      mins = Math.abs(end - start) / 60, seconds = mins * 60;
      return seconds;
    }

    if (rawNum1 > rawNum2) {    // this workss 
      str1 = `${str1.slice(0, -2)}am`;
      str2 = `${str2.slice(0, -2)}pm`;

      start = str1, end = str2;

      // add date and convert to unix timestamp 
      start = new Date(`01.01.1970 ${start}`).getTime() / 1000;
      end = new Date(`01.01.1970 ${end}`).getTime() / 1000;

      mins = Math.abs(end - start) / 60, seconds = mins * 60;
    }
  }
  return seconds;
}

import { timerModeClock } from './global/global';
import { generateCurrentTime } from "./toggleInputs";
import { digitalTimeToSeconds, secondsToDigital } from './timeConversion';

// generate timer mode manual input timestamps
const genTimerModeManualTimeStamp = () => {
  // create END timestamp, use current time 
  var endStamp = generateCurrentTime(),
    endTimeFormat = generateCurrentTime();

  // store current am/pm 
  var ampm = endStamp.slice(-2);

  // convert to digital input - '02 : 00 : 00' - then into seconds 
  if (endStamp.charAt(5) === 'p') {
    endStamp = endStamp.replace(" pm", "").trim();
    endStamp = '0' + endStamp + ' : 00';
    endStamp = endStamp.replace(":", " : ");
  }
  if (endStamp.charAt(5) === 'a') {
    endStamp = endStamp.replace(" am", "").trim();
    endStamp = '0' + endStamp + ' : 00';
    endStamp = endStamp.replace(":", " : ");
  }
  if (endStamp.charAt(6) === 'a') {
    endStamp = endStamp.replace(" am", "").trim();
    endStamp = endStamp + ' : 00';
    endStamp = endStamp.replace(":", " : ");
  }

  if (endStamp.charAt(6) === 'p') {
    endStamp = endStamp.replace(" pm", "").trim();
    endStamp = endStamp + ' : 00';
    endStamp = endStamp.replace(":", " : ");
  }

  // convert to seconds 
  let endStampSeconds = digitalTimeToSeconds(endStamp);

  // convert input to seconds
  let timerSeconds = timerModeClock.value; // test '07 : 54 : 00';
  if (timerSeconds.length === 11) {
    timerSeconds = '0' + timerSeconds;
  }
  timerSeconds = digitalTimeToSeconds(timerSeconds);

  // endStamp seconds - input clock seconds
  var differSeconds = '';
  if (endStampSeconds > timerSeconds) {
    differSeconds = endStampSeconds - timerSeconds;
  } else if (endStampSeconds < timerSeconds) {
    var negDif = timerSeconds - endStampSeconds;

    // 12 hours' of seconds - negDif 
    differSeconds = 43200 - negDif;
    if (ampm = 'pm') { // toggle AM/PM 
      ampm = 'am';
    } else {
      ampm = 'am';
    }

  } else { // if seconds match, default to hour 12 
    differSeconds = 43200;
  }

  // convert result to START timestamp - returns '03 : 26 : 00'
  var startTime = secondsToDigital(differSeconds);

  // format to '4:33 pm' 
  var startTimeFormat = startTime;
  startTimeFormat = startTimeFormat.slice(0, -5);

  // if both chars are '0', then it landed on '12:00' 
  if (startTimeFormat.charAt(0) === '0' && startTimeFormat.charAt(1) === '0') {
    startTimeFormat = startTimeFormat.substr(2);
    startTimeFormat = '12' + startTimeFormat;
  }

  if (startTimeFormat.charAt(0) === '0') {
    startTimeFormat = startTimeFormat.substr(1);
  }

  // remove empty spaces 
  startTimeFormat = startTimeFormat.replace(/\s/g, '');
  startTimeFormat = startTimeFormat + ' ' + ampm;

  // create final timestamp 
  var timerModeManualStamps = startTimeFormat + " - " + endTimeFormat

  return timerModeManualStamps;
}

export { timesToSeconds, genTimerModeManualTimeStamp }; 

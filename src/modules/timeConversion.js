let manualModeButton = document.getElementById('manual'),
timerModeButton = document.getElementById('timer'),
timerModeClock = document.getElementById('clock'),
manualInput1 = document.getElementById('manual-entry-1'),
arrow = document.getElementById('arrow'),
datepickerInput = document.getElementById('datepicker'),
manualInput2 = document.getElementById('manual-entry-2');

// get timer input value 
function genDigitalTime() {
  let str = document.getElementById("clock").value;
  if (str.length === 11) {
    str = "0" + str; 
  }
  return str;
}

// converts "10 : 01 : 22" to "10 hours 1 minute 22 seconds"
const digitalTimeToWord = (str) => {
  let seconds = str.charAt(10) + str.charAt(11),
  minutes = str.charAt(5) + str.charAt(6),
  hours = str.charAt(0) + str.charAt(1),
  wordTime = '';

  let hms = [hours, minutes, seconds],
  hmsString = ["hour", "minute", "second"];

  for (var t = 0; t < hms.length; t++) {
    if (hms[t] !== "00") {
      if (hms[t].charAt( 0 ) === "0" ) {
        hms[t] = hms[t].substring(1);
      } 

      if (hms[t] !== "1") {
        hms[t] += " " + hmsString[t] + "s" + " ";
      }

      if (hms[t] === "1") {
        hms[t] += " " + hmsString[t] + " ";
      }
      wordTime += hms[t];
    }
  }
  wordTime = wordTime.trim();
  return wordTime;
}

// converts "10 : 01 : 22" to "36082"
const digitalTimeToSeconds = (str) => {
  let seconds = Number(str.charAt(10) + str.charAt(11)),
  minutes = Number(str.charAt(5) + str.charAt(6)),
  hours = Number(str.charAt(0) + str.charAt(1));

  // convert each time measurement to seconds 
  hours = hours * (60*60);
  minutes = minutes * (60);
  seconds = seconds;

  let totalSeconds = [hours, minutes, seconds].reduce((x, y) => x + y);
  return totalSeconds;
}

// converts "36082" seconds to "10 : 01 : 22"
const secondsToDigital = (arg) => {
  let hours = Math.floor(arg / (60 * 60)),
  minutes = Math.floor((((arg % 31536000) % 86400) % 3600) / 60),
  seconds = (((arg % 31536000) % 86400) % 3600) % 60;

  let hrs = ('0' + hours).slice(-2),
  mins = ('0' + minutes).slice(-2),
  secs = ('0' + seconds).slice(-2);

  let digitalTime = hrs + " \: " + mins + " \: " + secs;
  return digitalTime;
}


// converts "1 hour 2 minutes 3 seconds" to "3723" seconds
const wordedTimeToSeconds = (str) => {

  String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
  }

  var blankSlate = "00 : 00 : 00";

  if (str.includes("hour")) {
    var basePoint = str.substr(0,str.indexOf(' ')).trim(); 
    if (basePoint.length === 2) {
      blankSlate = blankSlate.replaceAt(0, basePoint); 
      var index = str.indexOf( ' ', str.indexOf( ' ' ) + 1 );
      var str = str.substr( index + 1 );
    }
    if (basePoint.length === 1) {
      blankSlate = blankSlate.replaceAt(1, basePoint); 
      var index = str.indexOf( ' ', str.indexOf( ' ' ) + 1 );
      var str = str.substr( index + 1 );
    }
  }

  if (str.includes("minute")) {
    basePoint = str.substr(0,str.indexOf(' ')).trim(); 

    if (basePoint.length === 2) {
      blankSlate = blankSlate.replaceAt(5, basePoint); 
      var index = str.indexOf( ' ', str.indexOf( ' ' ) + 1 );
      var str = str.substr( index + 1 );
    }
    if (basePoint.length === 1) {
      blankSlate = blankSlate.replaceAt(6, basePoint); 
      var index = str.indexOf( ' ', str.indexOf( ' ' ) + 1 );
      var str = str.substr( index + 1 );
    }
  }

  if (str.includes("second")) {
    basePoint = str.substr(0,str.indexOf(' ')).trim(); 
    if (basePoint.length === 2) {
      blankSlate = blankSlate.replaceAt(10, basePoint); 
      var index = str.indexOf( ' ', str.indexOf( ' ' ) + 1 );
      var str = str.substr( index + 1 );
    }
    if (basePoint.length === 1) {
      blankSlate = blankSlate.replaceAt(11, basePoint); 
      var index = str.indexOf( ' ', str.indexOf( ' ' ) + 1 );
      var str = str.substr( index + 1 );
    }
  }

return digitalTimeToSeconds(blankSlate);
}

export {genDigitalTime, digitalTimeToWord, digitalTimeToSeconds, secondsToDigital, wordedTimeToSeconds}; 
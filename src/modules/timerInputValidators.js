let projToggle = document.getElementById("projToggle"),
taskInput = document.getElementById("placeholder");

const checkTaskInput = () => {
  var checkTaskFlag = true; 
  if (taskInput.value === '') {
    checkTaskFlag = false; 
  }
  return checkTaskFlag;
}

// get task input
const getTaskInput = () => {
  return taskInput.value; 
}

// check for invalid input - '80 seconds' should be 1:20, etc. 
const validateTimerModeEntry = () => {
let time = document.getElementById("clock").value; 
let forbidden = ['6', '7', '8', '9']; 
var timeEntryFlag = true;

function checkForbidden(index1, index2) {
  let mins = time.charAt(index1); 
  let secs = time.charAt(index2);
  for (let m = 0; m < 5; m++) {
    if(forbidden[m] === mins) {
      timeEntryFlag = false;
    } 
    if (forbidden[m] === secs) {
      timeEntryFlag = false;
    } 
  }
}
  if (time === "0 : 00 : 00" || time === "00 : 00 : 00") { 
    timeEntryFlag = false;
  }

  if (time.length === 11) {
    checkForbidden(4, 9);
  }

  if (time.length === 12) {
    checkForbidden(5, 10);
  }

  if (time.match(/[a-z]/i)) {
    timeEntryFlag = false;
  }
  if (time.length < 11 || time.length > 12) {
    timeEntryFlag = false;
  } 

  return timeEntryFlag;
}

const validateManualModeEntry = () => {
  let m1 = document.getElementById('manual-entry-1').value,
      dp = document.getElementById('datepicker').value,
      m2 = document.getElementById('manual-entry-2').value,
      chosenDateYear = $( "#datepicker" ).datepicker( "getDate" ).getFullYear(),
      currentYear = (new Date()).getFullYear();

      // create AM/PM variable
      let ampm1 = m1.toLowerCase().substr(m2.length - 3).trim(),
          ampm2 = m2.toLowerCase().substr(m2.length - 3).trim();

      if (ampm1 !== 'pm' && ampm1 !== 'am') {
        return false;
      }

      if (ampm2 !== 'pm' && ampm2 !== 'am') {
        return false; 
      }

      // ensure date isn't in future
      if (currentYear < chosenDateYear) {
        return false; 
      }

      return true;
}

const checkAssignedProject = () => {
  var checkProjectFlag = true; 
  if (projToggle.innerHTML === '<i class="plus">+</i> Project/task') {
    checkProjectFlag = false; 
  }
  return checkProjectFlag;
}

export {getTaskInput, checkTaskInput, validateTimerModeEntry, validateManualModeEntry, checkAssignedProject};
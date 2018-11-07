let projToggle = document.getElementById("projToggle"),
taskInput = document.getElementById("placeholder");

const checkTaskInput = () => {
  if (taskInput.value === '') {
    return false; 
  }
  return true;
}

// get task input
const getTaskInput = () => {
  return taskInput.value; 
}

// check for invalid input - '80 seconds' should be 1:20, etc. 
const validateTimerModeEntry = () => {
let time = document.getElementById("clock").value; 
let forbidden = ['6', '7', '8', '9']; 

  function checkForbidden(index1, index2) {
    let mins = time.charAt(index1); 
    let secs =   time.charAt(index2);
    for (let m = 0; m < 5; m++) {
      if(forbidden[m] === mins) {
        return false;
      } 
      if (forbidden[m] === secs) {
        return false;
      } 
    }
  }
  if (time === "0 : 00 : 00" || time === "00 : 00 : 00") { 
    return false;
  }

  if (time.length === 11) {
    checkForbidden(4, 9);
  }

  if (time.length === 12) {
    checkForbidden(5, 10);
  }

  if (time.match(/[a-z]/i)) {
    return false;
  }
  if (time.length < 11 || time.length > 12) {
    return false;
  } 

  return true;
}

const validateManualModeEntry = () => {
  let m1 = document.getElementById('manual-entry-1').value,
      dp = document.getElementById('datepicker').value,
      m2 = document.getElementById('manual-entry-2').value,
      chosenDateYear = $( "#datepicker" ).datepicker( "getDate" ).getFullYear(),
      currentYear = (new Date()).getFullYear();

      function checkFormat(str) {
        String.prototype.isNumber = function(){return /^\d+$/.test(this);}

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
          s = s.slice(0, b) + s.slice(b+1);
            if (s.isNumber() === false) {
              return false;
            }
        }
      }
    
      if (checkFormat(m1) === false) {
        return false;
      }

      if (checkFormat(m2) === false) {
        return false;
      }

      // create + check AM/PM variables
      let ampm1 = m1.toLowerCase().substr(m1.length - 3).trim(),
          ampm2 = m2.toLowerCase().substr(m2.length - 3).trim();

      if (ampm1 !== 'pm' && ampm1 !== 'am') {
        return false;
      }

      if (ampm2 !== 'pm' && ampm2 !== 'am') {
        return false; 
      }

      // invalid pm to am time 
      if (dp == 'Today') {
        if (ampm1 == 'pm' && ampm2 == 'am') {
        return false;
        }
      }

      // ensure date isn't in future
      if (currentYear < chosenDateYear) {
        return false; 
      }

      return true;
}

const checkAssignedProject = () => { 
  if (projToggle.innerHTML === '<i class="plus">+</i> Project/task') {
    return false; 
  }
  return true;
}

export {getTaskInput, checkTaskInput, validateTimerModeEntry, validateManualModeEntry, checkAssignedProject};
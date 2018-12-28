import {startButton, resetButton, projToggle, stopClock} from './global/global';
import {generateCurrentTime} from "./toggleInputs";

let hour = 0,
    minute = 0,
    seconds = 0,
    totalSeconds = 0;

let intervalId = null;

const startTimer = () => {
  
  // start timer 
  ++totalSeconds;
  hour = Math.floor(totalSeconds /3600);
  minute = Math.floor((totalSeconds - hour*3600)/60);
  seconds = totalSeconds - (hour*3600 + minute*60);

  if (seconds < 10) {
    seconds = "" + 0 + seconds;
  }

  stopClock.value = ((hour<=9) ? "0"+hour : hour) + " : " + ((minute<=9) ? "0" + minute : minute) + " : " + seconds;
  document.title = stopClock.value + ' - Timer App'; // show timer in <title> 

  if(stopClock.value.charAt(0) === '0'){
    stopClock.value = stopClock.value.substr(1);
  }
}

var counter = 1;
startButton.addEventListener('click', () => {
  counter++;
  if (counter % 2 == 0) {
    intervalId = setInterval(startTimer, 1000);
    startButton.innerHTML = '<i class="fa fa-pause"></i>';
    startButton.style.backgroundColor = '#C84630';
  } else {
  clearInterval(intervalId); // pause timer 
    startButton.innerHTML = '<i class="fa fa-play start"></i>';
    startButton.style.backgroundColor = '#4CAF50';
  }
});

export {startTimer};
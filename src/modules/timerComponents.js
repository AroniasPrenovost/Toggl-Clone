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

resetButton.addEventListener('click', () => {
  totalSeconds = 0;
  stopClock.value = "0 : 00 : 00";

clearInterval(intervalId); // pause timer 
 startButton.innerHTML = '<i class="fa fa-play start"></i>';
 startButton.style.backgroundColor = '#4CAF50';
});

const trackListItemTime = () => {
  $("ul").on("click", ".fa-play", function(event){

  // index of button clicked
  let buttonIndex = $(this).parents('li').index();

  let li = document.getElementById('projects').getElementsByClassName('listItem')[buttonIndex].innerHTML;

  // remove everything up to second instance of <div> 
  let rawString = li.substring(li.indexOf("º") + 7);

  // get task content and replace placeholder field text 
  let task = rawString.split("<div ")[0].trim();
  document.getElementById("placeholder").value = task;

  let project = rawString.split("</h6>")[0].trim().split(")\">").pop();
  projToggle.innerHTML = "Project - " + project;

  // start timer 
  resetButton.click();
  startButton.click();
  });
}

export {startTimer, trackListItemTime};
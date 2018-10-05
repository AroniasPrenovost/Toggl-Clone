let hour = 0;
let minute = 0;
let seconds = 0;
let totalSeconds = 0;

let startButton = document.getElementById('start-btn');
let resetButton = document.getElementById('reset-btn');
let toggle = document.getElementById("toggle");
let stopClock = document.getElementsByName("clock")[0];

let intervalId = null;

const startTimer = () => {
  ++totalSeconds;
  hour = Math.floor(totalSeconds /3600);
  minute = Math.floor((totalSeconds - hour*3600)/60);
  seconds = totalSeconds - (hour*3600 + minute*60);

  if (seconds < 10) {
    seconds = "" + 0 + seconds;
  }

  stopClock.value = ((hour<=9) ? "0"+hour : hour) + " : " + ((minute<=9) ? "0" + minute : minute) + " : " + seconds;

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
    startButton.style.backgroundColor = 'red';
  } else {
clearInterval(intervalId); // pause timer 
 startButton.innerHTML = '<i class="fa fa-play"></i>';
 startButton.style.backgroundColor = 'green';
}
})

resetButton.addEventListener('click', () => {
  totalSeconds = 0;
  stopClock.value = "0 : 00 : 00";

clearInterval(intervalId); // pause timer 
 startButton.innerHTML = '<i class="fa fa-play"></i>';
 startButton.style.backgroundColor = 'green';
});

const trackListItemTime = () => {
  $("ul").on("click", ".fa-hourglass", function(event){

// index of button clicked
let buttonIndex = $(this).parents('li').index();

let li = document.getElementById('projects').getElementsByClassName('listItem')[buttonIndex].innerHTML;

// remove everything up to second instance of <div> 
let rawString = li.substring(li.indexOf("º") + 7);

// get task content and replace placeholder field text 
let task = rawString.split("<div ")[0].trim();
document.getElementById("placeholder").value = task;

let project = rawString.split("</h6>")[0].trim().split(")\">").pop();
toggle.innerHTML = "Project - " + project;

// start timer 
resetButton.click();
startButton.click();
});
}

export {startTimer, trackListItemTime};
let manualModeButton = document.getElementById('manual');
let timerModeButton = document.getElementById('timer');
let timerModeClock = document.getElementById('clock');
let manualInput1 = document.getElementById('manual-entry-1');
let manualInput2 = document.getElementById('manual-entry-2');
let toggleInputs = document.getElementsByClassName('toggle-inputs');

manualModeButton.addEventListener('click', () => {
	// toggle button colors 
	manualModeButton.style.color = "#27ae60";
	timerModeButton.style.color = "#7f8c8d";

	timerModeClock.style.display = "none";
	manualInput1.style.display = "inline-block";
	manualInput2.style.display = "inline-block"; 
});

timerModeButton.addEventListener('click', () => {
	// toggle button colors, show/hide fields 
	manualModeButton.style.color = "#7f8c8d";
	timerModeButton.style.color = "#27ae60";

	timerModeClock.style.display = "inline-block"; 
	manualInput1.style.display = "none";
	manualInput2.style.display = "none"; 
});

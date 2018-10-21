let manualModeButton = document.getElementById('manual'),
	timerModeButton = document.getElementById('timer'),
	timerModeClock = document.getElementById('clock'),
	manualInput1 = document.getElementById('manual-entry-1'),
	manualInput2 = document.getElementById('manual-entry-2'),
	datepicker = document.getElementById('datepicker');
	// dateEntryToggle = document.getElementById('entry-date-toggle');

const currentTimeManualInput = () => { 
    let d = new Date();
    let n = d.toLocaleTimeString().replace(/:\d{2}\s/,' ');
    manualInput1.value = n;
	manualInput2.value = n;
}

// jquery datepicker 
$(function() {
	$("#datepicker").datepicker();
});

function formatDate() {
	if (datepicker.value.length > 5) {
		datepicker.value = datepicker.value.slice(0, -1);
	}
}
setInterval(formatDate, 0);

manualModeButton.addEventListener('click', () => {
	// toggle button colors 
	manualModeButton.style.color = "#27ae60";
	timerModeButton.style.color = "#7f8c8d";

	timerModeClock.style.display = "none";
	manualInput1.style.display = "inline-block";
	manualInput2.style.display = "inline-block";
	//dateEntryToggle.style.visibility = "visible";

	currentTimeManualInput();
});

timerModeButton.addEventListener('click', () => {
	// toggle button colors, show/hide fields 
	manualModeButton.style.color = "#7f8c8d";
	timerModeButton.style.color = "#27ae60";

	timerModeClock.style.display = "inline-block"; 
	manualInput1.style.display = "none";
	manualInput2.style.display = "none";
	//dateEntryToggle.style.visibility = "hidden";
});

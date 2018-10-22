let manualModeButton = document.getElementById('manual'),
	timerModeButton = document.getElementById('timer'),
	timerModeClock = document.getElementById('clock'),
	manualInput1 = document.getElementById('manual-entry-1'),
	manualInput2 = document.getElementById('manual-entry-2'),
	datepicker = document.getElementById('datepicker');
	// dateEntryToggle = document.getElementById('entry-date-toggle');

// convert time to 12 hour AM/PM format
const formatAMPM = (date) => { 
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	let strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

const currentTimeManualInput = () => { 
	let date = new Date(); 
	manualInput1.value = formatAMPM(date); 
	manualInput2.value = formatAMPM(date);
}

// jquery datepicker 
$(function() {
	$("#datepicker").datepicker({
		format: "mm/dd",
		language: "en",
		changeMonth: true,
		changeYear: false
	}).on('changeDate', function(e){
		$(this).datepicker('hide');
	});
});

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

import { manualModeButton, timerModeButton, timerModeClock, manualInput1, arrow, datepickerInput, manualInput2 } from './global/global';

// get manual inputs 
const getManualInputs = () => {
	let chosenDateNoYear = document.getElementById("datepicker").value,
		chosenDateYear = $("#datepicker").datepicker("getDate").getFullYear();
	return [manualInput1.value, manualInput2.value, datepickerInput.value, chosenDateYear];
}

// convert time to 12 hour AM/PM format
const formatAMPM = (date) => {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	let strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

const generateTodaysDate = () => {
	let todaysDate = new Date();
	let dd = todaysDate.getDate(),
		mm = todaysDate.getMonth() + 1, //January is 0
		yyyy = todaysDate.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}

	todaysDate = mm + '/' + dd + '/' + yyyy;
	return todaysDate;
}

// convert 'mm/dd/yyyy' to 'yyyy-mm-dd' format 
function convertToAlternateDate(arg) {
	let yyyy = arg.slice(-4);
	let dd = arg.charAt(3) + arg.charAt(4);
	let mm = arg.substring(0, 2);
	return yyyy + '-' + mm + '-' + dd;
}

// convert '2013-07-31' to 'Wed, 28 Nov' format 
function dateToShorthand(date) {

	// generate day of week 
	let dayNames = [
		'Mon',
		'Tues',
		'Wed',
		'Thur',
		'Fri',
		'Sat',
		'Sun'
	];

	let d = new Date(date);
	let dayOfWeek = dayNames[d.getDay()];

	// generate day of month 
	let dayOfMonth = date.slice(-2);

	// generate month
	let months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	let x = date.charAt(5) + date.charAt(6);
	x = Number(x) - 1;
	let month = months[x];

	// get year 
	let year = date.substring(0, 4);

	return dayOfWeek + ', ' + dayOfMonth + ' ' + month + ', ' + year;
}


const generateCurrentTime = () => {
	let date = new Date();
	let currentTime = formatAMPM(date);
	return currentTime;
}

const currentTimeManualInput = () => {
	manualInput1.value = generateCurrentTime();
	manualInput2.value = generateCurrentTime();
}

// jquery datepicker 
$(function () {
	$("#datepicker").datepicker({
		format: "mm/dd",
		language: "en",
		changeMonth: true,
		changeYear: false
	}).on('changeDate', function (e) {
		$(this).datepicker('hide');
	});
});

// show manual time input 
manualModeButton.addEventListener('click', () => {
	manualModeButton.style.color = "#27ae60";
	timerModeButton.style.color = "#7f8c8d";

	timerModeClock.style.display = "none";
	manualInput1.style.display = "inline-block";
	datepickerInput.style.display = "inline-block";
	arrow.style.display = "inline-block";
	manualInput2.style.display = "inline-block";

	currentTimeManualInput();
});

// hide manual time input 
timerModeButton.addEventListener('click', () => {
	manualModeButton.style.color = "#7f8c8d";
	timerModeButton.style.color = "#27ae60";

	timerModeClock.style.display = "inline-block";
	manualInput1.style.display = "none";
	datepickerInput.style.display = "none";
	arrow.style.display = "none";
	manualInput2.style.display = "none";
});


const checkManualInput = () => {
	var manInputFlag = true;
	if (manualInput1.style.display == "" || manualInput1.style.display == "none") {
		manInputFlag = false;
	}
	if (manualInput2.style.display == "" || manualInput2.style.display == "none") {
		manInputFlag = false;
	}
	return manInputFlag;
}

export { generateTodaysDate, convertToAlternateDate, dateToShorthand, formatAMPM, generateCurrentTime, checkManualInput, getManualInputs };

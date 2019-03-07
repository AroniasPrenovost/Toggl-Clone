// import {toggleBill} from "./toggleInputs";

const toggleBilling = () => {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('billIcon')) {
            event.target.classList.toggle('billIconToggle');
        }
    }, false);
}

const resumeTime = () => {
	document.addEventListener('click', function (event) {
		if (event.target.classList.contains('fa-play')) {
		// add flag class 
		event.target.classList.toggle('billed');
		const billIcons = [...document.getElementsByClassName('fa-play')];
			for (var x = 0; x < billIcons.length;x++) {
				console.log(billIcons[x]);
			}
		}
	}, false);
}

const checkBillingToggle = () => {
	if (document.querySelector(".billIcon").classList.contains("billIconToggle")) {
		return true;
	}
	return false;
}

export {toggleBilling, checkBillingToggle, resumeTime};  
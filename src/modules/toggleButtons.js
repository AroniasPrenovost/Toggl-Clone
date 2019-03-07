// import {toggleBill} from "./toggleInputs";

const toggleBilling = () => {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('billIcon')) {
            event.target.classList.toggle('billIconToggle');
        }
    }, false);
}

const checkBillingToggle = () => {
	if (document.querySelector(".billIcon").classList.contains("billIconToggle")) {
		return true;
	}
	return false;
}

export {toggleBilling, checkBillingToggle};  
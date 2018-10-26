let toggleBill = document.getElementById("billIcon"); 

const toggleBilling = () => {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('billIcon')) {
            event.target.classList.toggle('billIconToggle');
        }
    }, false);
}

const checkBillingToggled = () => {

	// if element is active, append below as active 

	// note that in the data 

}

export {toggleBilling};
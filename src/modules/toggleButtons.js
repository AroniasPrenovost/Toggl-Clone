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
		event.target.classList.add('act-play'); // add flag class 
		const playIcons = [...document.getElementsByClassName('fa-play')];
			for (let x = 0; x < playIcons.length;x++) {
				if (playIcons[x].classList.contains('act-play')) {
				let index = x; 
				console.log(index);

				if (index === 0) {
        			return false; 
    			}

    			//let item = listEntries[index];

			    // append task 
			  //  document.getElementById('placeholder').value = item.task_name;

			    // append project name 
			  //  projToggle.innerHTML = 'Project - ' + item.project_name;

			  // startButton.click();

				}
			}
			event.target.classList.remove('act-play');
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
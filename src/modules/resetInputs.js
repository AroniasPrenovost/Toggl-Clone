import {startButton, myInput, projToggle, timerModeButton, taskInput, stopClock, colorCodeButton, colorNormalButton, datepickerInput} from './global/global';

const resetInputs = () => {

    // timer is running 
    if (startButton.style.backgroundColor === 'rgb(200, 70, 48)') {
        startButton.click();
    }

    taskInput.placeholder = 'Add new to-do';
    taskInput.value = "";
    myInput.placeholder = 'Search..';
    projToggle.innerHTML = '<i class="plus">+</i> Project/task';
    datepickerInput.value = 'Today';
    timerModeButton.click();
    stopClock.value = '0 : 00 : 00',
    $('#container input').slice(1, 2).css({'backgroundColor': '#27ae60'});
    document.title = 'Timer App';
    // to do...
    // reset datepicker selection 
}

const showLis = () => {
    $('ul li').each(function(i){
        $(this).show(); 
    });    
    $(this).prev().val(function(){
        return this.defaultValue;
    })
}

export {resetInputs, showLis};
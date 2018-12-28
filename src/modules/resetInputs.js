import {startButton, resetButton, myInput, projToggle, timerModeButton, taskInput, colorCodeButton, colorNormalButton, datepickerInput} from './global/global';

const resetInputs = () => {
    startButton.click();
    // resetButton.click();
    taskInput.placeholder = 'Add new to-do';
    taskInput.value = "";
    myInput.placeholder = 'Search..';
    projToggle.innerHTML = '<i class="plus">+</i> Project/task';
    datepickerInput.value = 'Today';
    timerModeButton.click();
    $('#container input').slice(1, 2).css({'backgroundColor': '#27ae60'});
    document.title = 'Timer App';
    // need to reset datepicker selection 
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
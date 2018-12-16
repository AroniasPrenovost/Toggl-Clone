import {startButton, resetButton, myInput, projToggle, timerModeButton, taskInput, colorCodeButton, colorNormalButton, datepickerInput} from './global/global';

// reset inputs 
const resetInputs = () => {
    startButton.click();
    resetButton.click();
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

// shuffle array 
const shuffle = arr => arr.sort( () => (Math.random() - 0.5) );

// random hex color generator
const getRandomColor = () => {
    var length = 6;
    var chars = '0123456789ABCDEF';
    // shuffle char order 
    chars = Array.from(chars); 
    chars = shuffle(chars);
   
    var hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
}

// change project tag colors 
const changeProjectNameColors = (str) => {
    var projectNames = [];
    $( ".dDButton" ).each(function() {
        if (str === "randomize") {
            projectNames.push([($(this).attr('id')), (getRandomColor())]);
        }
        if (str === "normalize") {
            projectNames.push([($(this).attr('id')), ("rgb(92, 107, 115)")]);
        }
    });

    $('h6').each(function () {
        for (var c = 0; c < projectNames.length; c++) {
            if ($(this).html() === projectNames[c][0]) {
                $(this).css("background-color", projectNames[c][1]);
            }
        }
    });
}

const determineProjectTagColors = (str1, str2) => {
    if (str2 !== "rgb(92, 107, 115)") {
        var currentProjectColors = [];
        var h6number = $("#projects h6").length;
        $("h6").each(function() {
            currentProjectColors.push([($(this).html()), ($(this).css("background-color"))]);
        });

        currentProjectColors.length = h6number; // remove duplicates from array 

        var allProjectNames = [];
        $( ".dDButton" ).each(function() {
            allProjectNames.push([($(this).attr('id'))]);
        });

        let projColor = '';
        let counter = '';
        for (var o = 0; o < currentProjectColors.length; o++) {
            if (str1 === currentProjectColors[o][0]) {
                projColor = currentProjectColors[o][1];
            } 

            if (str1 !== currentProjectColors[o][0]) {
                counter++;
            } 
        }

    if (counter === currentProjectColors.length) {
        projColor = getRandomColor();
    }
    return projColor;
    }
    return str2; 
}

const projectNameAndColor = () => {
    var projtitle = projToggle.innerHTML.split(" - ").pop();
    var color = '';
    color = $("h6:first").css("background-color");

    //  one or more li exists
    if (typeof color === "string" || color instanceof String){
        if (color !== "rgb(92, 107, 115)") {
            color = determineProjectTagColors(projtitle, color);
        } else {
            color = color;
        }
    } else { 
    color = "rgb(92, 107, 115)"; // first instance of li 
    }

    return [projtitle, color]; 
}

// color code, normalize project tags
colorCodeButton.addEventListener('click', () => {
    changeProjectNameColors("randomize");
});

colorNormalButton.addEventListener('click', () => {
    changeProjectNameColors("normalize");
});

export {resetInputs, showLis, getRandomColor, changeProjectNameColors, determineProjectTagColors, projectNameAndColor};

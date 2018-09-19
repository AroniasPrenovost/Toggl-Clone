let startButton = document.getElementById('start-btn');
let resetButton = document.getElementById('reset-btn');
let myInput = document.getElementById("myInput");
let toggle = document.getElementById("toggle");

// reset inputs 
const resetInputs = () => {
    startButton.click();
    resetButton.click();
    myInput.placeholder = "Search..";
    toggle.innerHTML = "Project Name";
    $("#container input").slice(1, 2).css({"backgroundColor": "#27ae60"});
}

const showLis = () => {
    $('ul li').each(function(i){
        $(this).show(); 
    });    
    $(this).prev().val(function(){
        return this.defaultValue;
    })
}

// random hex color generator
const getRandomColor = () => {
    var length = 6;
    var chars = '0123456789ABCDEF';
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

// color code, normalize project tags
const colorCodeButtons = () => {
    $(document).ready(function(){
        $("#colorCode").click(function(){
            changeProjectNameColors("randomize");
        });
    });

    $(document).ready(function(){
        $("#colorNormal").click(function(){
            changeProjectNameColors("normalize");
        });
    });
}  

$(document).ready(function(){
    $("#projectStatus").click(function(){

    });
});

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
var counter = '';
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

const appendToList = () => {
    $("input[type='text'").keypress(function(event){
        if(event.which === 13){
// grab new todo text from input
var todoText = $(this).val();
$(this).val("");
var color = '';
var projtitle = toggle.innerHTML.split(" - ").pop();
alert(projtitle);
var color = $("h6:first").css("background-color");

//  one or more li exists
if (typeof color === "string" || color instanceof String){
    if (color !== "rgb(92, 107, 115)") {
        color = determineProjectTagColors(projtitle, color);
    } else {
        color = color;
    }
} else { // first instance of li 
    color = "rgb(92, 107, 115)";
}

var projectCat = "<div class='projIcon'><h6 style='background-color:" + color + "'" + ">" + projtitle + "</h6></div>"
// create a new li and add to ul
//    $("ul").append("<li><span><i class='fa fa-trash'></i><i class='fa fa-hourglass'></i></span> " + todoText + "</li>");
$("ul").append("<li class='listItem'><span><i class='fa fa-trash'></i></span><p><i class='fa fa-hourglass'></i></p>" + "<div class='separator'>&nbsp;_&nbsp;</div>" + "<div class='separator'>&#186;</div>" + todoText + "   " + projectCat + "     " + "<p id=\'billIcon\' class=\'noselect\'>$</p>" + "</li>");

// show lis reset inputs 
showLis();
resetInputs();
}   
});
}

export {appendToList, colorCodeButtons};

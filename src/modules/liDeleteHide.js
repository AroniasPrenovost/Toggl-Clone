import {projToggle} from './global/global';

const appendTaskToInput = () => {
    $("ul").on("click", "li", function(){ 

    if (event.target.classList.contains('billIcon') != true) {     
        // index of button clicked
        let buttonIndex = $(this).index();
        let liContent = document.getElementById('projects').getElementsByClassName('listItem')[buttonIndex].innerHTML;
        
        // task input content 
        let input = liContent.split("<div ")[0].trim();
        document.getElementById("placeholder").value = input;

        // project name
        let project = liContent.split("</h6></div><div ")[0].trim();
        project = project.substring(project.lastIndexOf(">") + 1);
        projToggle.innerHTML = "Project - " + project;
        }
    });
}

export {appendTaskToInput}; 

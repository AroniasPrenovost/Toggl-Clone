// instad of cross-off, this adds to task input
// but doesn't update project 
let toggleBilling = document.getElementById("billIcon"); 

const addListTask = () => {
    $("ul").on("click", "li", function(){ 

        // index of button clicked
        let buttonIndex = $(this).index();
        let li = document.getElementById('projects').getElementsByClassName('listItem')[buttonIndex].innerHTML;

        // remove everything up to second instance of <div> 
        let rawString = li.substring(li.indexOf("º") + 7);

        // get task content and replace placeholder field text 
        let task = rawString.split("<div ")[0].trim();
        document.getElementById("placeholder").value = task;
    });
}

const deleteListItem = () =>  {
    $("ul").on("click", "span", function(event){ 
        $(this).parent().fadeOut(500,function(){
            $(this).remove();
        });
        event.stopPropagation();
    });
}

toggleBilling.addEventListener('click', () => {
  toggleBilling.classList.toggle("billIcon");
});

const hideListInput = () => {
    $(".fa-plus").click(function(){
        $("input[type='text']").fadeToggle();
        $(".dropbtn").fadeToggle();
        $("#start-btn").fadeToggle();
    });
}

export {addListTask, deleteListItem, hideListInput}; 

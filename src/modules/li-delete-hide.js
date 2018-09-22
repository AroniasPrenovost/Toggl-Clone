let toggleBilling = document.getElementById("billIcon"); 

const addListTask = () => {
    $("ul").on("click", "li", function(){ 

    if (event.target.classList.contains('billIcon') != true) {
        // index of button clicked
        let buttonIndex = $(this).index();
        let li = document.getElementById('projects').getElementsByClassName('listItem')[buttonIndex].innerHTML;

        // remove everything up to second instance of <div> 
        let rawString = li.substring(li.indexOf("º") + 7);

        // get task content and replace placeholder field text 
        let task = rawString.split("<div ")[0].trim();
        document.getElementById("placeholder").value = task;
        }
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

const toggleBill = () => {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('billIcon')) {
            event.target.classList.toggle('billIconToggle');
        }
    }, false);
}

const hideListInput = () => {
    $(".fa-plus").click(function(){
        $("input[type='text']").fadeToggle();
        $(".dropbtn").fadeToggle();
        $("#start-btn").fadeToggle();
    });
}

export {addListTask, deleteListItem, toggleBill, hideListInput}; 

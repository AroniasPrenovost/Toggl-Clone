const crossOffTask = () => {
    $("ul").on("click", "li", function(){
        $(this).toggleClass("completed");   
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

const hideListInput = () => {
    $(".fa-plus").click(function(){
        $("input[type='text'").fadeToggle();
    });
}


export {crossOffTask, deleteListItem, hideListInput}; 

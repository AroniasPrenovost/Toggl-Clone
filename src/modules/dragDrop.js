  const dragDropList = () => {
  $( ".droppable-area" ).sortable({
      connectWith: ".connected-sortable",
      stack: '.connected-sortable ul'
    }).disableSelection();
}
 export {dragDropList};
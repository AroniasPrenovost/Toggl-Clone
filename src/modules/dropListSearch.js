const listSearch = () => {
  $("document").ready(function () {
    $("#placeholder").on("keyup", function () {                             
      var searchText = $(this).val();
      searchText = searchText.toLowerCase();
      searchText = searchText.replace(/\s+/g, '');
      $('#projects > li').each(function(){
        var currentLiText = $(this).text(),      
        showCurrentLi = ((currentLiText.toLowerCase()).replace(/\s+/g, '')).indexOf(searchText) !== -1;
        $(this).toggle(showCurrentLi);
      });  
    });
  });
}
 
export {listSearch};
import { myInput, projToggle, myDropdown } from './global/global';

const toggleProjectDropdown = () => {
  projToggle.addEventListener('click', function () {
    myDropdown.classList.toggle('show');
  });
}

const filterFunction = () => {
  var filter, ul, li, a, i;
  filter = myInput.value.toUpperCase();
  a = myDropdown.getElementsByTagName('a');
  for (i = 0; i < a.length; i++) {
    if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = '';
    } else {
      a[i].style.display = 'none';
    }
  }
}

const filterEntry = () => {
  myInput.addEventListener('keyup', filterFunction);
}

const appendProjToButton = () => {
  $('.dDButton').click(function () {
    var projtitle = '';
    myInput.placeholder = "Search..";
    projtitle = $(this).attr('id');
    projToggle.innerHTML = 'Project - ' + projtitle;
    myDropdown.classList.toggle('show');
  });
}

export { toggleProjectDropdown, filterFunction, filterEntry, appendProjToButton };

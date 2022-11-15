const signInBtn = document.getElementById('signIn');
const signUpBtn = document.getElementById('signUp');
const fistForm = document.getElementById('form1');
const secondForm = document.getElementById('form2');
const container = document.querySelector('.container');


// var form_fields = document.getElementsByTagName('input')
// form_fields[1].placeholder='username...'
// form_fields[2].placeholder='username...'

// for (var field in form_fields){
//   form_fields[field].className += 'form-control'
// }

signInBtn.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

signUpBtn.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

fistForm.addEventListener('submit', (e) => e.preventDefault());
secondForm.addEventListener('submit', (e) => e.preventDefault());

import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', handlerSubmit);
form.addEventListener('input', throttle(handlerInput, 500));

initForm();

function handlerSubmit(event) {
  event.preventDefault();
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  if (email === '' || message === '') {
    alert('Всі поля повинні бути заповнені');
    return;
  }
  console.log({ email, message });
  form.reset();
  localStorage.clear();
}

function handlerInput(evt) {
  let inputs = localStorage.getItem(LOCALSTORAGE_KEY);
  inputs = inputs ? JSON.parse(inputs) : {};
  inputs[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(inputs));
}

function initForm() {
  let saveForm = localStorage.getItem(LOCALSTORAGE_KEY);
  if (saveForm) {
    saveForm = JSON.parse(saveForm);
    // console.log(saveForm);
    Object.entries(saveForm).forEach(([name, value]) => {
      //   console.log(name, value);
      //   console.log(form.elements);
      form.elements[name].value = value;
    });
  }
}

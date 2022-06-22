import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', handlerSubmit);
form.addEventListener('input', throttle(handlerChange, 500));

initForm();

function handlerSubmit(event) {
  event.preventDefault();
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  if (email === '' || message === '') {
    alert('Всі поля повинні бути заповнені');
    return;
  }
  form.reset();
  localStorage.clear();
  console.log(inputs);
}

function handlerChange(evt) {
  let inputs = localStorage.getItem('feedback-form-state');
  inputs = inputs ? JSON.parse(inputs) : {};
  inputs[evt.target.name] = evt.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(inputs));
}

function initForm() {
  let saveForm = localStorage.getItem('feedback-form-state');
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

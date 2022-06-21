import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

let inputs = {};
initForm();

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  if (email === '' || message === '') {
    alert('Всі поля повинні бути заповнені');
    return;
  }
  const formData = new FormData(form);
  formData.forEach(() => {
    form.reset();
    localStorage.clear();
  });

  console.log(inputs);
}

form.addEventListener('input', throttle(handlerChange, 500));

function handlerChange(evt) {
  inputs[evt.target.name] = evt.target.value;
  //   console.log(inputs);
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
      inputs[name] = value;
      form.elements[name].value = value;
    });
  }
}

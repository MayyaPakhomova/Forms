const cleanBtn = document.querySelector('.feedback-file__clean');
const fileInput = document.getElementById('myfile');
const filenameContainer = document.querySelector('.feedback-file__name');
const feedbackLabel = document.querySelectorAll('.feedback__label');
const feedbackInput = document.querySelectorAll('.feedback__input');
const message = document.querySelector('.message');
const form = document.getElementById('form');
document.addEventListener('DOMContentLoaded', function () {
  function send(event) {
    event.preventDefault();
    let error = formValidate();
    if (error === 0) {
      const req = new XMLHttpRequest();
      req.open('POST', 'send.php', true);
      req.onload = function () {
        if (req.status >= 200 && req.status < 400) {
          json = JSON.parse(this.response);
          if (json.result == 'success') {
            cleanForm();
            message.firstElementChild.textContent = 'Ваше сообщение отправлено';
            setInterval(() => {
              message.classList.remove('active');
            }, 5000);
          }
        } else {
          message.classList.add('active');
          message.firstElementChild.textContent = `Ваше сообщение не отправлено  Ошибка сервера  ${req.status}`;
          setInterval(() => {
            message.classList.remove('active');
          }, 5000);
        }
      };
      req.onerror = function () {
        alert('Ошибка отправки запроса');
      };
      req.send(new FormData(event.target));
    } else {
    }
  }

  cleanBtn.addEventListener('click', () => {
    filenameContainer.textContent = '';
    fileInput.value = '';
    cleanBtn.classList.remove('active');
  });

  fileInput.addEventListener('change', () => {
    filenameContainer.textContent = fileInput.value.split('\\').pop();
    cleanBtn.classList.add('active');
  });

  feedbackInput.forEach((input) => {
    input.addEventListener('input', (e) => {
      if (input.value.length) {
        e.target.previousElementSibling.classList.add('filled');
      } else {
        e.target.previousElementSibling.classList.remove('filled');
      }
    });
    input.addEventListener('focus', (e) => {
      e.target.previousElementSibling.classList.add('focus');
    });
    input.addEventListener('blur', (e) => {
      e.target.previousElementSibling.classList.remove('focus');
    });
  });

  function cleanForm() {
    message.classList.add('active');
    form.reset();
    cleanBtn.classList.remove('active');
    feedbackLabel.forEach((label) => {
      label.classList.remove('focus');
      label.classList.remove('filled');
    });
  }

  function formValidate() {
    let error = 0;
    let formReq = document.querySelectorAll('.req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      const errorLabel = input.nextElementSibling;
      const errorCheckbox = document.querySelector('.error-label-checkbox');
      const errorMail = document.querySelector('.error-label-mail');
      formRemoveError(errorLabel);
      formRemoveError(errorCheckbox);
      formRemoveError(input);

      if (input.classList.contains('email')) {
        console.log(emailTest(input));
        if (!emailTest(input)) {
          errorMail.textContent = 'Введите корректный адрес';
          formAddError(errorLabel);
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
        formAddError(errorCheckbox);
        error++;
      }
      if (input.value === '') {
        formAddError(input);
        formAddError(errorLabel);
        errorLabel.textContent = 'Поле не может быть пустым';
        error++;
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add('error');
  }

  function formRemoveError(input) {
    input.classList.remove('error');
  }
  function emailTest(input) {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(input.value);
  }

  form.addEventListener('submit', send);
});

let selector = document.querySelector('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(selector);

const token = '5895645934:AAGiWQrp6FKnLEQw_pprUceavQdf0bq7zLA';
const chat_id = '797389332';
const url = `https://api.telegram.org/bot${token}/sendMessage`;

const success = document.getElementById('success');
const tgButton = document.getElementById('tg-button')
const messageTg = document.getElementById('message-tg');
const formTg = document.getElementById('form-tg');
const ladelTg = document.querySelectorAll('.ladel-tg');
const errorTg = document.querySelector('.error-label-tg');


selector.addEventListener('input', ()=>{
  if(selector.value.length!=0){

if(selector.value.match(/[0-9]/g).length === 11){
  tgButton.disabled = false
  errorTg.textContent=''
  formTg.removeEventListener('submit',sendTg)
  formTg.addEventListener('submit',sendTg);
}else{
  tgButton.disabled = true
  errorTg.textContent='Введите корректный номер телефона'
}
  }
});
function sendTg(e){
  e.preventDefault();
  let message = `<b> Заявка с тестового сайта</b>\n`;
  message += `<b>Имя отправителя</b> ${this.tgName.value}\n`;
  message += `<b>Телефон</b> ${this.tgPhone.value}`;
  axios
    .post(url, {
      chat_id: chat_id,
      parse_mode: 'html',
      text: message,
    })
    .then((res) => {
      cleanFormTg();
      messageTg.firstElementChild.textContent = 'Ваше сообщение отправлено';
      setInterval(() => {
        messageTg.classList.remove('active');
      }, 5000);
    })
    .catch((err) => {
      messageTg.classList.add('active');
      messageTg.firstElementChild.innerHTML = `Ваше сообщение не отправлено<br>Попробуйте еще раз`;
      setInterval(() => {
        messageTg.classList.remove('active');
      }, 5000);
    })
}

function cleanFormTg() {
  messageTg.classList.add('active');
  formTg.reset();
  ladelTg.forEach((label) => {
    label.classList.remove('focus');
    label.classList.remove('filled');
  });
}

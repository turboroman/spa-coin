import { el, setChildren } from 'redom';
import '../style.scss';
import validImg from '../assets/imgs/valid.svg';
import invalidImg from '../assets/imgs/invalid.svg';

const title = el('h2', { class: 'form__title' }, 'Вход в аккаунт');

const validMessageLogin = el('div', { class: 'form__valid-massage' });
const validMessagePassword = el('div', { class: 'form__valid-massage' });

const inputLogin = el('input', { class: 'form__input' }, { placeholder: 'Введите логин' });
const labelLogin = el('label', { class: 'form__label' }, [
  el('span', { class: 'form__span' }, 'Логин'),
  inputLogin,
  validMessageLogin,
]);

const inputPassword = el('input', { class: 'form__input' }, { placeholder: 'Введите пароль' });
const labelPassword = el('label', { class: 'form__label' }, [
  el('span', { class: 'form__span' }, 'Пароль'),
  inputPassword,
  validMessagePassword,
]);

const btn = el('button', { class: 'form__btn btn-reset' }, 'Войти');

const form = el('form', { class: 'form' }, [
  title,
  labelLogin,
  labelPassword,
  btn,
]);

validateInput(inputLogin, validMessageLogin);
validateInput(inputPassword, validMessagePassword);

function createValidMessage(message, validState, type) {
  let imgURL;
  let spanClass;
  if (validState === 'invalid') {
    imgURL = invalidImg;
    spanClass = 'form__invalid-span';
  } else {
    imgURL = validImg;
    spanClass = 'form__valid-span';
  }

  setChildren(type, el('img', { src: imgURL }),
    el('span', { class: spanClass }, message))
}

export function validateInput(input, validType) {
  input.addEventListener('blur', () => {

    if (input.value.trim().length < 6 || input.value.trim().indexOf(' ') !== -1) {
      input.classList.add('form__input--invalid');

      validType.innerHTML = '';
      createValidMessage('Минимум 6 символов', 'invalid', validType);

      if (input.classList.contains('form__input--valid')) {
        input.classList.remove('form__input--valid')
      }
    } else {
      input.classList.add('form__input--valid');

      validType.innerHTML = '';
      createValidMessage('', 'valid', validType);
      if (input.classList.contains('form__input--invalid')) {
        input.classList.remove('form__input--invalid')
      }
    }
  })
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputLogin.classList.contains('form__input--valid') && inputPassword.classList.contains('form__input--valid')) {

    getUserToken(inputLogin.value, inputPassword.value);
  }
})

function getUserToken(userLogin, userPassword) {
  fetch(`http://localhost:3000/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: userLogin,
      password: userPassword,
    })
  })
    .then(response => response.json())
    .then(obj => {
      if (obj.error === 'No such user') {
        validMessageLogin.innerHTML = '';
        validMessageLogin.classList.add('form__input--invalid');
        createValidMessage('Нет такого пользователя', 'invalid', validMessageLogin);
      } else if (!obj.payload) {
        validMessagePassword.innerHTML = '';
        validMessagePassword.classList.add('form__input--invalid');
        createValidMessage('Неверный пароль', 'invalid', validMessagePassword);
      } else {
        console.log('теперь реализовать это');
        console.log(obj.payload);
      }
    });
}

export default form;

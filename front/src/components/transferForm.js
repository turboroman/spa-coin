import { el, setChildren } from 'redom';
import '../style.scss';
import { LS, initPage } from '../index.js';
import Choices from 'choices.js';
import { makeTranfer } from './api';

export function createTransferForm(accountOfSender) {
  const form = el('form', { class: 'transfer-form' });
  const formHeading = el('h3', { class: 'transfer-form__heading' }, 'Новый перевод');

  // ==== RECEIVER SELECT ====
  const receiverWrapper = el('div', { class: 'transfer-form__receiver receiver' });
  const receiverHeading = el('span', { class: 'receiver__heading' }, 'Номер счёта получателя');
  const receiverSelect = el('select', { class: 'receiver__select', placeholder: 'Введите номер счёта' });

  const accountsList = JSON.parse(LS.getItem('accounts'));

  accountsList.forEach(account => {
    if (account.account !== accountOfSender) {
      const receiverOption = el('option', { class: 'receiver__option ' });
      receiverOption.innerHTML = account.account;
      receiverSelect.append(receiverOption);
    }
  });

  setChildren(receiverWrapper, [receiverHeading, receiverSelect]);

  const receiverChoices = new Choices(receiverSelect, {
    allowHTML: true,
    // searchEnabled: false,
    removeItems: false,
    itemSelectText: '',
    position: 'bottom',
    renderSelectedChoices: false,
  });

  // ==== TRANSFER AMOUNT ====
  const amountWrapper = el('div', { class: 'transfer-form__amount amount' });
  const amountHeading = el('span', { class: 'amount__heading' }, 'Сумма перевода');
  const amountInput = el('input', { class: 'amount__input' });

  amountInput.addEventListener('input', () => {
    amountInput.value = amountInput.value.replace(/\D/, '')
  })

  setChildren(amountWrapper, [amountHeading, amountInput]);

  // ==== SEND BTN ====
  const sendBtn = el('button', { class: 'transfer-form__send-btn blue-btn' }, 'Отправить');
  sendBtn.addEventListener('click', (a) => {
    a.preventDefault()

    makeTranfer(accountOfSender, receiverSelect.value, amountInput.value)
    amountInput.value = ''

    initPage()
  });

  setChildren(form, [formHeading, receiverWrapper, amountWrapper, sendBtn]);

  return form;
}
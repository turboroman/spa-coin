import { el, setChildren } from 'redom';
import '../style.scss';
import  { LS } from '../index.js';
import Choices from 'choices.js';

export function createTransferForm() {
  const form = el('form', { class: 'transfer-form'});
  const formHeading = el('h3', { class: 'transfer-form__heading' }, 'Новый перевод');

  // ==== RECEIVER SELECT ====
  const receiverWrapper = el('div', { class: 'transfer-form__receiver receiver'});
  const receiverHeading = el('span', { class: 'receiver__heading' }, 'Номер счёта получателя');
  const receiverSelect = el('select', { class: 'receiver__select', placeholder: 'Введите номер счёта' });

  const accountsList = JSON.parse(LS.getItem('accounts'));
  console.log(accountsList)
  accountsList.forEach(account => {
    const receiverOption = el('option', { class: 'receiver__option '});
    receiverOption.innerHTML = account.account;
    receiverSelect.append(receiverOption);
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
  const amountWrapper = el('div', { class: 'transfer-form__amount amount'});
  const amountHeading = el('span', { class: 'amount__heading' }, 'Сумма перевода');
  const amountInput = el('input', { class: 'amount__input' });

  setChildren(amountWrapper, [amountHeading, amountInput]);

  // ==== SEND BTN ====
  const sendBtn = el('button', { class: 'transfer-form__send-btn blue-btn'}, 'Отправить');
  sendBtn.addEventListener('submit', () => {
 
  });

  setChildren(form, [formHeading, receiverWrapper, amountWrapper, sendBtn]);

  return form;
}
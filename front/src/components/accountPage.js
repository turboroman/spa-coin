import { el, setChildren } from 'redom';
import '../style.scss';
import { createHeaderWithNav } from './header.js';
import { LS, changeAddress } from '../index.js';
import { createTransferForm } from './transferForm.js';

export function createAccountPage(data) {
  const app = el('div');
  const header = createHeaderWithNav();
  const accountContent = el('div', { class: 'account container' });
  
  const accountTopWrapper = el('div', { class: 'account__top-wrapper' });
  const accountTopUp = el('div', { class: 'account__top' });
  const accountTitle = el('h2', { class: 'account__heading' }, 'Просмотр счёта');
  const backBtn = el('button', { class: 'account__back-btn blue-btn' }, 'Вернуться назад');
  changeAddress(backBtn, '/accounts');
  setChildren(accountTopUp, [accountTitle, backBtn]);

  const accountTopDown = el('div', { class: 'account__top' });
  const accountNumber = el('span', { class: 'account__number' });
  accountNumber.textContent = '№ ' + data.account;

  const accountBalance = el('div', { class: 'account__balance-wrapper'}, [
    el('span', { class: 'account__balance-text'}, 'Баланс:'),
    el('span', { class: 'account__balance-number'}, data.balance + ' Р'),
  ]);
  setChildren(accountTopDown, [accountNumber, accountBalance]);
  setChildren(accountTopWrapper, [accountTopUp, accountTopDown]);

  const newTransferForm = createTransferForm();
  
  setChildren(accountContent, [accountTopWrapper, newTransferForm]);
  setChildren(app, [header, accountContent]);
  return app;
}

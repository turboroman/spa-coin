import { el, setChildren } from 'redom';
import { initPage } from '../index';
import logo from '../assets/imgs/Logo.svg';
import '../style.scss';
import { changeAddress } from '../index.js';

export function createHeader() {
  return el('header', { class: 'header' }, [
    el('div', { class: 'header__container container' },
      el('img', { src: logo }),
    )
  ]);
}

export function createHeaderWithNav() {
  const headerNav = el('nav', { class: 'header__nav' });

  const linkBanks = el('a', { class: 'header__link header__link--banks' }, 'Банкоматы');
  const linkAccounts = el('a', { class: 'header__link header__link--accounts' }, 'Счета');
  const linkCurrency = el('a', { class: 'header__link header__link--currency' }, 'Валюта');
  const linkExit = el('a', { class: 'header__link header__link--exit' }, 'Выйти');

  changeAddress(linkBanks, `/banks`);

  changeAddress(linkAccounts, '/accounts');

  changeAddress(linkCurrency, '/currencies');

  changeAddress(linkExit, '/');
  linkExit.addEventListener('click', () => {
    localStorage.removeItem('login');
  });

  setChildren(headerNav, [
    linkBanks,
    linkAccounts,
    linkCurrency,
    linkExit
  ]);

  return el('header', { class: 'header' }, [
    el('div', { class: 'header__container container' },
      el('img', { src: logo }),
      headerNav
    )
  ]);
}

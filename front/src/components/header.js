import { el, setChildren } from 'redom';
import { initPage } from '../index';
import logo from '../assets/imgs/Logo.svg';
import '../style.scss';

export function createHeader() {
  return el('header', { class: 'header' }, [
    el('div', { class: 'header__container container' },
      el('img', { src: logo }),
    )
  ]);
}

function changeAddress(btn, address) {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, '', address);
    initPage();
  })
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

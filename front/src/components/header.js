import { el, setChildren } from 'redom';
import logo from '../assets/imgs/Logo.svg';
import '../style.scss';

export function createHeader() {
  return el('header', { class: 'header' }, [
    el('div', { class: 'header__container container' },
      el('img', { src: logo }),
    )
  ]);
}

export function createHeaderWithNav() {
  const headerNav = el('nav', { class: 'header__nav' });

  const linkATM = el('a', { class: 'header__link header__link--atm' }, 'Банкоматы');
  const linkAccounts = el('a', { class: 'header__link header__link--accounts' }, 'Счета');
  const linkCurrency = el('a', { class: 'header__link header__link--currency' }, 'Валюта');
  const linkExit = el('a', { class: 'header__link header__link--exit' }, 'Выйти');
  linkExit.href = '/';

  setChildren(headerNav, [
    linkATM,
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




import { el, setChildren } from 'redom';
import '../style.scss';
import { createHeaderWithNav } from './header.js';

export function createBanksPage() {
  const app = el('div');
  const header = createHeaderWithNav();
  const banksContent = el('div', {class: 'banks container'});
  banksContent.textContent = 'Тут будет карта банкоматов';

  setChildren(app, [header, banksContent]);

  return app;
}
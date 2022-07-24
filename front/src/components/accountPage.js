import { el, setChildren } from 'redom';
import '../style.scss';
import { loadAPI } from './api';
import { createHeaderWithNav } from './header.js';

export function createAccountPage() {
  const app = el('div');
  const header = createHeaderWithNav();
  const accountContent = el('div', {class: 'accounts container'});
  accountContent.textContent = 'Контент о счёте'
  setChildren(app, [header, accountContent]);

  return app;
}

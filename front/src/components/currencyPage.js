import { el, setChildren } from 'redom';
import '../style.scss';
import { loadAPI } from './api';
import { createHeaderWithNav } from './header.js';

export function createCarrencyPage() {
  const app = el('div');
  const header = createHeaderWithNav();
  const currencyContent = el('div', {class: 'currency container'});
  currencyContent.textContent = 'Тут будет котнтент о валюте';

  setChildren(app, [header, currencyContent]);

  return app;
}
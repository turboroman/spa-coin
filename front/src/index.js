import 'babel-polyfill';

import {el, setChildren} from 'redom';

import header from './components/header.js';
import form from './components/form.js';

const main = el('main');

setChildren(window.document.body, [
  header,
  main,
])

setChildren(main, form)

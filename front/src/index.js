import 'babel-polyfill';

import { el, setChildren } from 'redom';
import { createHeader } from './components/header.js';
import { createFormPage } from './components/formPage.js';

// const main = el('main');

// const header = createHeader();
// setChildren(window.document.body, [
//   header,
//   main,
// ])

// setChildren(main, form)

const formPage = createFormPage();

window.document.body.append(formPage)

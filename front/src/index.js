import 'babel-polyfill';

import { el, setChildren } from 'redom';
import { createFormPage } from './components/formPage.js';
import { loadAPI, getUserToken } from './components/api';
import { createAllAccountsPage } from './components/allAccounts.js'

export const LS = localStorage;
let accountsData = JSON.parse(LS.getItem('accounts data'));

export function initPage() {

  if (location.pathname == '/') {
    window.document.body.innerHTML = '';
    window.document.body.append(createFormPage())
  }

  if (location.pathname == '/accounts') {
    window.document.body.innerHTML = '';
    window.document.body.append(createAllAccountsPage(accountsData))
  }
}

initPage();

// =================================
// const formPage = createFormPage();
// window.document.body.append(formPage)
// window.document.body.innerHTML = formPage.innerHTML

// ==================================

// const routes = {
//   '/': createFormPage(),
//   '/accounts': createAllAccountsPage(accountsData)
// };

// renderPage(routes[location.pathname]);

// function renderPage(path) {
//   window.document.body.innerHTML = '';
//   window.document.body.append(path);
// }

// ====================================

// function loadResource(src) {
//   return import(src);
//   // return fetch(src).then(res => res.json());
// }

// function renderPage(src) {
//   return new Promise(loadResource(src))
//     .then(([pageModule, data]) => {
//       window.document.body.innerHTML = '';
//       window.document.body.append(pageModule.render(data));
//     });
// }

// if (location.path == '/') {
//   renderPage('./components/formPage.js');
// } else {
//   // renderPage('./components/allAccounts.js');
// }

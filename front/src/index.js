import 'babel-polyfill';

import { el, setChildren } from 'redom';
import { createHeader } from './components/header.js';
import { createFormPage } from './components/formPage.js';
import { loadAPI, getUserToken } from './components/api';
import { createAllAccountsPage } from './components/allAccounts.js'

// const formPage = createFormPage();
// window.document.body.append(formPage)

// ==================================
export const LS = localStorage;

let accountsData = JSON.parse(LS.getItem('accounts data'));

const routes = {
  '/': createFormPage(),
  '/accounts': createAllAccountsPage(accountsData)
};

window.document.body.innerHTML = routes[location.pathname].innerHTML

console.log(LS)

// ========================================

// function loadResource(src) {
//   if (src.endsWith('.js')) {
//     return import(src);
//   } else {
//     getUserToken(src);
//   }
// }

// function renderPage(moduleName, apiUrl) {
//   Promise.all([moduleName, apiUrl].map(src => loadResource(src)))
//     .then(([pageModule, data]) => {
//       window.document.body = '';
//       window.document.body.append(pageModule.render(data));
//     });
// }

// renderPage('./components/formPage.js', `/accounts`);

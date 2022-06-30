import 'babel-polyfill';

import { el, setChildren } from 'redom';
import { createFormPage } from './components/formPage.js';
import { loadAPI, getUserToken } from './components/api';
import { createAllAccountsPage } from './components/allAccounts.js'

// const formPage = createFormPage();
// window.document.body.append(formPage)
// window.document.body.innerHTML = formPage.innerHTML

// ==================================

export const LS = localStorage;
let accountsData = JSON.parse(LS.getItem('accountsdata'));

const routes = {
  '/': createFormPage(),
  '/accounts': createAllAccountsPage(accountsData)
};

// такой вариант не работает
// window.document.body.innerHTML = routes[location.pathname].innerHTML
// а вот такой работает
// window.document.body.append(routes[location.pathname])

showPageContent(routes[location.pathname]);

function showPageContent(path) {
  window.document.body.innerHTML = '';
  window.document.body.append(path);
}

console.log(LS)

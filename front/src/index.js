import 'babel-polyfill';

export const LS = localStorage;
let accountsData = JSON.parse(LS.getItem('accounts data'));

export async function initPage() {
  window.document.body.innerHTML = '';

  const moduleForm = await import('./components/formPage.js');
  if (location.pathname == '/') {
    window.document.body.append(moduleForm.createFormPage())
  }

  const moduleAllAccounts = await import('./components/allAccounts.js');
  if (location.pathname == '/accounts') {
    window.document.body.append(moduleAllAccounts.createAllAccountsPage(accountsData))
  }

  const moduleBanks = await import('./components/banksPage.js');
  if (location.pathname == '/banks') {
    window.document.body.append(moduleBanks.createBanksPage())
  }

  const moduleCurrencies = await import('./components/currencyPage.js');
  if (location.pathname == '/currencies') {
    window.document.body.append(moduleCurrencies.createCarrencyPage())
  }
}

initPage();
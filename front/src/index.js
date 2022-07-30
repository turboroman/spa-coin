import 'babel-polyfill';
import './style.scss';
import { loadAPI } from './components/api.js';

export const LS = localStorage;
const accountsData = JSON.parse(LS.getItem('accounts'));
const banksData = JSON.parse(LS.getItem('banks'));


const appWrapper = document.createElement('div');
appWrapper.classList.add('app');
window.document.body.append(appWrapper);


export async function initPage() {
  appWrapper.innerHTML = '';

  if (location.pathname == '/' || !localStorage.login) {
    const moduleForm = await import('./components/formPage.js');
    appWrapper.append(moduleForm.createFormPage())
  } else {

    if (location.pathname == '/accounts') {
      const moduleAllAccounts = await import('./components/allAccounts.js');
      appWrapper.append(moduleAllAccounts.createAllAccountsPage(accountsData));
    }

    if (location.pathname == '/banks') {
      const moduleBanks = await import('./components/banksPage.js');
      appWrapper.append(moduleBanks.createBanksPage(banksData));
        
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAeaBdrKOAHldYo6ErNz3Ko2gL-rJqk-Ws&callback=initMap";
      script.async = true;
      script.defer = true;
      window.document.body.append(script);
    }

    if (location.pathname == '/currencies') {
      const moduleCurrencies = await import('./components/currencyPage.js');
      window.document.body.append(moduleCurrencies.createCarrencyPage());
      appWrapper.append(moduleCurrencies.createCarrencyPage())
    }
  }
}

initPage();
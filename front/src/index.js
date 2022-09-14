import 'babel-polyfill';
import './style.scss';
import { loadAPI } from './components/api.js';

export const LS = localStorage;
const banksData = JSON.parse(LS.getItem('banks'));

export const appWrapper = document.createElement('div');
appWrapper.classList.add('app');
window.document.body.append(appWrapper);

export async function initPage() {
  appWrapper.innerHTML = '';

  if (!localStorage.login) {
    const moduleForm = await import('./components/formPage.js');
    appWrapper.append(moduleForm.createFormPage())
  } else {

    if (location.pathname == '/' || location.pathname == '/accounts') {
      const moduleAllAccounts = await import('./components/allAccounts.js');
      moduleAllAccounts.createAllAccountsPage().then(app => appWrapper.append(app));
    }

    if (location.pathname == '/banks') {
      const moduleBanks = await import('./components/banksPage.js');
      appWrapper.append(moduleBanks.createBanksPage(banksData));
    }

    if (location.pathname == '/currencies') {
      const moduleCurrencies = await import('./components/currencyPage.js');
      appWrapper.append(moduleCurrencies.createCarrencyPage())
    }
    
    if (LS.getItem('opened Account') !== null) {
      const openedAccount = JSON.parse(LS.getItem('opened Account'))

      if (location.pathname == `/account/${openedAccount}`) {
        const moduleAccount = await import('./components/accountPage.js');
        
        moduleAccount.createAccountPage(openedAccount).then(app => appWrapper.append(app))
      }
    } 
  }
}

export function changeAddress(btn, address) {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, '', address);
    initPage();
  })
}

window.onpopstate = () => initPage();

initPage();
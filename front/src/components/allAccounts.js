import { el, setChildren } from 'redom';
import '../style.scss';
import { createHeaderWithNav } from './header.js';
import Choices from 'choices.js';
import { LS, changeAddress, appWrapper, initPage } from '../index.js';
import { loadAPI, getAccountInfo } from './api';

export async function createAllAccountsPage() {

  const token = JSON.parse(LS.getItem('token'));

  await loadAPI(`accounts`, token)
    .then(objAccounts => LS.setItem('accounts', JSON.stringify(objAccounts.payload)))
  const accountsData = JSON.parse(LS.getItem('accounts'));

  const app = el('div');
  const header = createHeaderWithNav();
  const accounts = el('div', { class: 'accounts container' });
  const accountsUpper = el('div', { class: 'accounts__upper' });
  const cardsList = el('div', { class: 'accounts__list' })

  const upperLeft = el('div', { class: 'accounts__upper-left' });
  const accountsHeading = el('h2', { class: 'accounts__heading' }, 'Ваши счета');

  const accountsSelect = el('select', { class: 'accounts__select' });

  const optionHeading = el('option', { class: 'accounts__option' }, 'Сортировка');
  const optionNumber = el('option', { class: 'accounts__option', value: 'По номеру' }, 'По номеру');
  const optionBalance = el('option', { class: 'accounts__option', value: 'По балансу' }, 'По балансу');
  const optionLastTrans = el('option', { class: 'accounts__option', value: 'По последней транзакции' }, 'По последней транзакции');
  setChildren(accountsSelect, [optionHeading, optionNumber, optionBalance, optionLastTrans]);

  accountsSelect.addEventListener('change', () => {
    if (accountsSelect.value === 'По номеру') {
      accountsData.sort((a, b) => a.account > b.account ? 1 : -1);
    }
    if (accountsSelect.value === 'По балансу') {
      accountsData.sort((a, b) => a.balance < b.balance ? 1 : -1);
    }
    if (accountsSelect.value === 'По последней транзакции') {
      accountsData.sort((a, b) => a.transactions[0] > b.transactions[0] ? 1 : -1);
    }
    createAccountsList();
  });

  setChildren(upperLeft, [accountsHeading, accountsSelect]);
  accountsUpper.append(upperLeft);

  const accountsChoices = new Choices(accountsSelect, {
    allowHTML: true,
    searchEnabled: false,
    removeItems: false,
    itemSelectText: '',
    position: 'bottom',
    renderChoiceLimit: 3,
    renderSelectedChoices: false,
  });

  const addAccountBtn = el('button', { class: 'accounts__add-btn blue-btn' }, 'Создать новый счёт');

  addAccountBtn.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/create-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
    })
      .then(response => response.json())
      .then(objAcc => accountsData.push(objAcc.payload))

    LS.setItem('accounts', JSON.stringify(accountsData));

    createAccountsList();
  })

  createAccountsList();

  accountsUpper.append(addAccountBtn);
  accounts.append(accountsUpper);

  function createAccountsList() {
    cardsList.innerHTML = '';
    if (accountsData) {
      accountsData.forEach(account => {
        const card = el('div', { class: 'accounts__card card-account' }, [
          el('h3', { class: 'card-account__title' }, account.account),
          el('span', { class: 'card-account__balance' }, account.balance + 'P'),
        ]);

        if (account.transactions[0]) {
          const dateFromData = account.transactions[0].date;
          const year = dateFromData.split('-')[0];
          const monthNumber = dateFromData.split('-')[1];
          let monthWord;
          switch (monthNumber) {
            case '01':
              monthWord = 'Январь';
            case '02':
              monthWord = 'Февраль';
            case '03':
              monthWord = 'Март';
            case '04':
              monthWord = 'Апрель';
            case '05':
              monthWord = 'Май';
            case '06':
              monthWord = 'Июнь';
            case '07':
              monthWord = 'Июль';
            case '08':
              monthWord = 'Август';
            case '09':
              monthWord = 'Сентябрь';
            case '10':
              monthWord = 'Октябрь';
            case '11':
              monthWord = 'Ноябрь';
            case '12':
              monthWord = 'Декабрь';
          }
          const day = dateFromData.split('-')[2].split('T')[0];
          const dateToShow = day + ' ' + monthWord + ' ' + year;

          const cardBottom = el('div', { class: 'card-account__bottom' }, [
            el('div', { class: 'card-account__transaction' }, [
              el('span', { class: 'card-account__trans-text' }, 'Последняя транзакция'),
              el('span', { class: 'card-account__trans-date' }, dateToShow),
            ])
          ]);
          cardBottom.append(createOpenBtn());

          card.append(cardBottom);

        } else {
          const cardBottom = el('div', { class: 'card-account__bottom' }, [
            el('div', { class: 'card-account__transaction' }, [
              el('span', { class: 'card-account__trans-text' }, 'Список транзакций пуст'),
            ]),
          ]);
          cardBottom.append(createOpenBtn());

          card.append(cardBottom);
        }

        function createOpenBtn() {
          const openAccountBtn = el('button', { class: 'card-account__btn blue-btn' }, 'Открыть');
          openAccountBtn.addEventListener('click', async (e) => {
            LS.removeItem('opened Account')
            LS.setItem('opened Account', JSON.stringify(account.account))

            LS.removeItem('account data')

            await getAccountInfo(account.account, token)
              .then(obj => LS.setItem('account data', JSON.stringify(obj.payload)))

            e.preventDefault();
            history.pushState(null, '', `/account/${account.account}`);
            initPage();
          })
          // changeAddress(openAccountBtn, `/account/${account.account}`)

          return openAccountBtn;
        }
        cardsList.append(card);
      })
    }
  }

  accounts.append(cardsList);
  setChildren(app, [header, accounts]);

  // initPage()

  return app;
}

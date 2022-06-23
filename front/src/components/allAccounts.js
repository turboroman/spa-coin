import { el, setChildren } from 'redom';
import '../style.scss';
import { loadIPI } from './api';
import { createHeaderWithNav } from './header.js';

export function createAllAccountsPage(data) {
  const app = el('div');
  const header = createHeaderWithNav();
  const accounts = el('div', {class: 'accounts container'});
  const cardsList = el('div', {class: 'accounts__list'})

  data.forEach(account => {
    const card = el('div', {class: 'accounts__card card'}, [
      el('h3', {class: 'card__title'}, account.account),
      el('span', {class: 'card__balance'}, account.balance + 'р'),
      el('div', {class: 'card__bottom'}, [
        el('div', {class: 'card__transaction'}, [
          el('span', {class: 'card__trans-text'}, 'Последняя транзакция'),
          el('span', {class: 'card__trans-date'}, account.transactions[0].date),
        ]),
        el('button', {class: 'card__btn'}, 'Открыть')
      ]),
    ]);

    cardsList.append(card);
  })

  accounts.append(cardsList);
  setChildren(app, [header, accounts]);

  return app;
}

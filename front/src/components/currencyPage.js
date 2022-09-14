import { el, setChildren } from 'redom';
import '../style.scss';
import { loadAPI } from './api';
import { createHeaderWithNav } from './header.js';
import { LS } from '../index.js';

const token = JSON.parse(LS.getItem('token'))

export function createCarrencyPage() {
  const app = el('div');
  const header = createHeaderWithNav();
  const currencyContent = el('div', { class: 'currency container' });
  const currencyHeading = el('h1', { class: 'currency__heading' }, 'Валютный обмен')

  async function createYourCurrency() {
    const yourCurWrapper = el('div', { class: 'currency__card-cur card-cur' })
    const yourCurHeading = el('h2', { class: 'card-cur__heading' }, 'Ваши валюты')
    const yourCurList = el('ul', { class: 'card-cur__list' })

    let curListData
    await loadAPI('currencies', token)
      .then(obj => curListData = obj.payload)


    console.log(curListData)
    Object.entries(curListData).forEach(([key, value]) => {
      const curWrapper = el('li', { class: 'card-cur__item' })
      const curCode = el('span', { class: 'card-cur__code' }, key)
      const curAmount = el('span', { class: 'card-cur__amount' }, value.amount)
      setChildren(curWrapper, [curCode, curAmount])
      yourCurList.append(curWrapper)
    })

    setChildren(yourCurWrapper, [yourCurHeading, yourCurList])
    return yourCurWrapper
  }

  createYourCurrency().then(card => currencyContent.append(card))

  setChildren(currencyContent, [currencyHeading,]);
  setChildren(app, [header, currencyContent]);

  return app;
}
import { el, setChildren } from 'redom';
import '../style.scss';
import { loadAPI, makeExchange } from './api';
import { createHeaderWithNav } from './header.js';
import { initPage, LS } from '../index.js';
import Choices from 'choices.js';

const token = JSON.parse(LS.getItem('token'))

export function createCarrencyPage() {
  const app = el('div');
  const header = createHeaderWithNav();
  const currencyContent = el('div', { class: 'currency container' }, [
    el('h1', { class: 'currency__heading' }, 'Валютный обмен')
  ]);

  async function createYourCurrency() {
    const yourCurWrapper = el('div', { class: 'currency__card-cur card-cur' })
    const yourCurHeading = el('h2', { class: 'card-cur__heading' }, 'Ваши валюты')
    const yourCurList = el('ul', { class: 'card-cur__list' })

    let curListData
    await loadAPI('currencies', token)
      .then(obj => curListData = obj.payload)

    Object.entries(curListData).forEach(([key, value]) => {
      const curWrapper = el('li', { class: 'card-cur__item' })
      const curCode = el('span', { class: 'card-cur__code' }, key)
      const dots = el('span', { class: 'card-cur__dots' })
      const curAmount = el('span', { class: 'card-cur__amount' }, value.amount)
      setChildren(curWrapper, [curCode, dots, curAmount])
      yourCurList.append(curWrapper)
    })

    setChildren(yourCurWrapper, [yourCurHeading, yourCurList])
    return yourCurWrapper
  }
  createYourCurrency().then(card => currencyContent.append(card))

  async function createExchangeForm() {
    const exchangeWrapper = el('div', { class: 'currency__card-cur card-cur' })
    const exchangeHeading = el('h2', { class: 'card-cur__heading' }, 'Обмен валюты')

    const exchangeForm = el('form', { class: 'currency__ex-form ex-form' })

    const selectsWrapper = el('div', { class: 'ex-form__selects' })

    // ======== FROM =========

    const fromWrapper = el('div', { class: 'ex-form__from-wrapper' }, [
      el('span', { class: 'ex-form__text' }, 'Из')
    ])
    const fromSelect = el('select', { class: 'ex-form__select' })
    fromWrapper.append(fromSelect)

    let curListData
    await loadAPI('currencies', token)
      .then(obj => curListData = obj.payload)

    Object.keys(curListData).forEach(cur => {
      const fromOption = el('option', { class: 'ex-form__option ' });
      fromOption.innerHTML = cur;
      fromSelect.append(fromOption);
    });

    const fromChoices = new Choices(fromSelect, {
      searchEnabled: false,
      allowHTML: true,
      removeItems: false,
      itemSelectText: '',
      position: 'bottom',
      renderSelectedChoices: false,
    });

    // ======= TO ========

    const toWrapper = el('div', { class: 'ex-form__to-wrapper' }, [
      el('span', { class: 'ex-form__text' }, 'в')
    ])
    const toSelect = el('select', { class: 'ex-form__select' })
    toWrapper.append(toSelect)

    Object.keys(curListData).forEach(cur => {
      const toOption = el('option', { class: 'ex-form__option ' });
      toOption.innerHTML = cur;
      toSelect.append(toOption);
    })

    const toChoices = new Choices(toSelect, {
      searchEnabled: false,
      allowHTML: true,
      removeItems: false,
      itemSelectText: '',
      position: 'bottom',
      renderSelectedChoices: false,
    });

    // =================

    const amountWrapper = el('div', { class: 'ex-form__amount-wrapper' }, [
      el('span', { class: 'ex-form__text' }, 'Сумма')
    ])
    const amountInput = el('input', { class: 'ex-form__input' })
    amountInput.addEventListener('input', () => {
      amountInput.value = amountInput.value.replace(/[^\d\.,]/g, "");
      amountInput.value = amountInput.value.replace(/,/g, ".");
    })
    amountWrapper.append(amountInput)

    const btn = el('button', { class: 'ex-form__btn btn-reset blue-btn' }, 'Обменять')

    btn.addEventListener('click', (a) => {
      a.preventDefault()

      if (fromSelect.value !== toSelect.value) {
        makeExchange(fromSelect.value, toSelect.value, amountInput.value)
        amountInput.value = ''

        initPage()
      } else {
        fromSelect.style.borderColor = 'red'
        toSelect.style.borderColor = 'red'
      }
    })

    setChildren(selectsWrapper, [fromWrapper, toWrapper])
    setChildren(exchangeForm, [selectsWrapper, amountWrapper, btn])
    setChildren(exchangeWrapper, [exchangeHeading, exchangeForm])

    return exchangeWrapper
  }
  createExchangeForm().then(card => currencyContent.append(card))

  setChildren(app, [header, currencyContent]);

  return app;
}
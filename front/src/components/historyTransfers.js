import { el, setChildren } from 'redom';
import '../style.scss';
import { LS, initPage } from '../index.js';
import Choices from 'choices.js';
import { makeTranfer } from './api';

export function createHistoryBlock(accountNumber, data) {
  const block = el('div', { class: 'history' });
  const historyHeading = el('h3', { class: 'history__heading' }, 'История переводов')

  const table = el('table', { class: 'history__table' })
  const thead = el('thead', { class: 'history__thead' }, [
    el('tr', { class: 'history__tr-thead' }, [
      el('th', { class: 'history__th-thead history__th-thead--first' }, 'Счёт отправителя'),
      el('th', { class: 'history__th-thead' }, 'Счёт получателя'),
      el('th', { class: 'history__th-thead' }, 'Сумма'),
      el('th', { class: 'history__th-thead history__th-thead--last' }, 'Дата')
    ])
  ])
  const tbody = el('tbody', { class: 'history__tbody' })

  data.slice(-10).forEach(trans => {
    const row = el('tr', { class: 'history__tr-body' }, [
      el('td', { class: 'history__th-tbody' }, trans.from.slice(-12)),
      el('td', { class: 'history__th-tbody' }, trans.to.slice(-12)),
    ])

    let colorClass
    let plusOrMinus
    if (trans.from !== accountNumber) {
      colorClass = 'history__th-tbody--green'
      plusOrMinus = '+'
    } else {
      colorClass = 'history__th-tbody--red'
      plusOrMinus = '-'
    }
    row.append(el('td', { class: `history__th-tbody ${colorClass}` }, (plusOrMinus + trans.amount)))

    const dateFromData = trans.date;
    const year = dateFromData.split('-')[0];
    const monthNumber = dateFromData.split('-')[1];
    const day = dateFromData.split('-')[2].split('T')[0];
    const dateToShow = day + '.' + monthNumber + '.' + year;
    row.append(el('td', { class: 'history__th-tbody' }, dateToShow))

    tbody.append(row)
  })

  setChildren(table, [thead, tbody])
  setChildren(block, [historyHeading, table])

  return block
}
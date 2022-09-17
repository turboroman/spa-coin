import { el, setChildren } from 'redom';
import '../style.scss';
import { LS, initPage } from '../index.js';
import Choices from 'choices.js';
import { makeTranfer } from './api';

export function createHistoryBlock() {
  const block = el('div', { class: 'history' });
  const historyHeading = el('h3', { class: 'history__heading' }, 'История переводов')

  

  setChildren(block, [historyHeading])

  return block
}
import { validateInput } from "../src/components/formPage";
import { el } from 'redom';
import '../style.scss';

test('correct input value', () => {
  const input = el('input', { class: 'form__input'});
  const validMessage = el('div', { class: 'form__valid-massage' });

  input.value = 'fsafsaf';
  validateInput(input, validMessage);
  expect(input.classList.contains('form__input--valid')).toBe(true);

  input.value = 'fsa fsaf';
  validateInput(input, validMessage);
  expect(input.classList.contains('form__input--invalid')).toBe(false);

  input.value = 'ff';
  validateInput(input, validMessage);
  expect(input.classList.contains('form__input--invalid')).toBe(false);

  input.value = '            ';
  validateInput(input, validMessage);
  expect(input.classList.contains('form__input--invalid')).toBe(false);
});

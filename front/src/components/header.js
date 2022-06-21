import {el} from 'redom';
import logo from '../assets/imgs/Logo.svg';
import '../style.scss';

export default el('header', {class: 'header'}, [
  el('div', {class: 'header__container container'}, 
    el('img', {src: logo}),
  )
]);




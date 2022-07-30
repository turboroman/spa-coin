import { el, setChildren } from 'redom';
import '../style.scss';
import { createHeaderWithNav } from './header.js';
import { loadAPI } from './api';
import { LS } from '../index.js'


const token = JSON.parse(LS.getItem('token'));

loadAPI(`banks`, token)
  .then(objBanks => LS.setItem('banks', JSON.stringify(objBanks.payload)))

export function createBanksPage(data) {
  const app = el('div');
  const header = createHeaderWithNav();
  const banksContent = el('div', { class: 'banks container' });

  function initMap() {
    let opt = {
      center: { lat: 55.748832114949074, lng: 37.63125223278815 },
      zoom: 11
    }

    const mapContainer = document.createElement('div');
    mapContainer.classList.add('banks__map');
    const map = new google.maps.Map(mapContainer, opt)

    window.document.body.append(mapContainer)
  }
  window.initMap = initMap;

  setChildren(app, [header, banksContent]);
  return app;
}
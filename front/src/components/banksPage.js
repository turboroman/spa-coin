import { el, setChildren } from 'redom';
import '../style.scss';
import { createHeaderWithNav } from './header.js';
import { loadAPI } from './api';
import { LS } from '../index.js'

// =============================
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
// =============================

const token = JSON.parse(LS.getItem('token'));

loadAPI(`banks`, token)
  .then(objBanks => LS.setItem('banks', JSON.stringify(objBanks.payload)))

export function createBanksPage(data) {
  const app = el('div');
  const header = createHeaderWithNav();
  const banksContent = el('div', { class: 'banks container' });
  const banksHeading = el('h2', 'Карта банкоматов', { class: 'banks__heading' });
  banksContent.append(banksHeading);

  const loader = new Loader({
    apiKey: 'AIzaSyAeaBdrKOAHldYo6ErNz3Ko2gL-rJqk-Ws',
    version: 'weekly',
  });

  const mapContainer = document.createElement('div');
  mapContainer.classList.add('banks__map');

  loader.load().then(async () => {
    const map = await new google.maps.Map(mapContainer, {
      center: { lat: 55.75221259626334, lng: 37.621441983104894 },
      zoom: 10.5,
    });

      data.forEach(element => {
        const coords = new google.maps.LatLng(element.lat, element.lon);
        const marker = new google.maps.Marker({
          position: coords,
          map: map,
        });
      });
    new MarkerClusterer({ map });
  });

  banksContent.append(mapContainer)

  setChildren(app, [header, banksContent]);
  return app;
}
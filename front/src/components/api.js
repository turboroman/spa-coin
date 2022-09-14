import { LS } from "../index.js";

export function loadAPI(src, token) {
  history.pushState(null, '', `${src}`);

  return fetch(`http://localhost:3000/${src}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
  })
    .then(response => response.json())
}

export function getUserToken(src, userLogin, userPassword) {
  return fetch(`http://localhost:3000/${src}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: userLogin,
      password: userPassword,
    })
  })
    .then(response => response.json())
}

export function getAccountInfo(openedAccount, token) {
  return fetch(`http://localhost:3000/account/${openedAccount}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
  })
    .then(response => response.json())
}

export function makeTranfer(sender, receiver, amount) {
  const tokenData = JSON.parse(LS.getItem('token'))

  return fetch(`http://localhost:3000/transfer-funds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${tokenData}`,
    },
    body: JSON.stringify({
      from: sender,
      to: receiver,
      amount: amount
    })
  })
    .then(response => response.json())
}


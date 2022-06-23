export function loadIPI(src, token) {
  return fetch(src, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
  })
    .then(response => response.json())
}

export function getUserToken(src, userLogin, userPassword) {
  return fetch(src, {
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


export function loadAPI(src, token) {
  window.history.pushState(
    {src},
    src,
    src
  )

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


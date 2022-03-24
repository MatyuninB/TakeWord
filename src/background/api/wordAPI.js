const BACK_URL = 'https://take-word.herokuapp.com'

// const BACK_URL = 'http://localhost:8000'

export const parseWord = () => {
  return new Promise((res) => res({text: 'Test Word', translation: 'Тестовое слово'}))
}

export const getRandomWord = async (token) => {
  let result = null
  if(token) {
    try {
    await fetch(`${BACK_URL}/getRandomWord`, {
        method: 'GET',
        headers: {
           'Authorization': token
          },
    }).then(res => res.json())
    .then(r => {
        result = r
    })
  } catch (e) {

  }
  }
  return result
}


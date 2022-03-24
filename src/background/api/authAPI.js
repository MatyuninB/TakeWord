// const BACK_URL = 'https://take-word.herokuapp.com'

const BACK_URL = 'http://localhost:8000'

export const register = async ({login, password}) => {
  let result
  try {
    await fetch(`${BACK_URL}/register?login=${login}&password=${password}`, {method: 'POST'})
      .then(res => res.json())
      .then(r => {
        result = r
      })
  } catch (e) {
    console.log(e)
  }
  return result
}

export const login = async ({login, password}) => {
    let result
    try {
      await fetch(`${BACK_URL}/login?login=${login}&password=${password}`, {method: 'POST'})
      .then(res => res.json())
      .then(r => {
        result = r
      })
    } catch (e) {
      console.log(e)
    }
    return result
}

export const auth = async (token) => {
  console.log(123)
    let result
    try {
        await fetch(`${BACK_URL}/auth`, {method: 'POST', headers: {
            'Authorization': token
        }})
      .then(res => res.json())
      .then(r => {
        result = r
      })
      .catch(e => {
        result = e
      })
    } catch (e) {
        result = e
    }
    console.log(result, 'result')
    return result
}

export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

export const validatePassword = (password) => {
    return String(password)
    .match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g);
}
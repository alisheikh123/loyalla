const ROOT_URL = 'http://172.107.33.108:1600';

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/api/Account/Login`, requestOptions);
    let data = await response.json();
    if (data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }

    dispatch({ type: 'LOGIN_ERROR', error: "ERROR!!" });
    return;
  } catch (error) {
    console.log(error)
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  // localStorage.removeItem('token');
}
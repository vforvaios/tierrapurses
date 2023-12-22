const makeRequest = (url, method, extraBody, token = '') =>
  fetch(`${process.env.REACT_APP_API}/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token !== '' && { Authorization: `Bearer ${token}` }),
    },
    ...(extraBody !== '' && { body: extraBody }),
  }).then((response) => response.json());

export default makeRequest;

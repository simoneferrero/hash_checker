import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON, status from the response
 */
function parseJSON(response) {
  const {
    status,
    ok,
  } = response;

  if (status === 204 || status === 202) {
    return {
      status,
      ok,
    };
  }
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status,
      ok,
      json,
    })));
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise}           The request promise
 */
export default function request(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(parseJSON)
      .then(({ status, ok, json }) => {
        let rejectObject;

        // we standardise the returned error to be an object with `message` and `status` properties
        if (typeof json === 'object') {
          rejectObject = { ...json, status };
        } else {
          rejectObject = { message: json, status };
        }

        return ok ? resolve(json) : reject(rejectObject);
      })
      .catch(({ message }) => reject({ error: message }));
  });
}

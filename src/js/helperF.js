// This file will contain reuseable functions (async and normal)
import { async } from 'regenerator-runtime';
import { TIMEOUT_SECS as timer } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(timer)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(timer)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url);
    // when we want to get data from an API, we just need to pass in the url, however, to send data to the API we need a second parameter of options (an object)
    // Headers are basically information about the request
    // The content type is standard, the application/json basically tells the API the request to be sent is in the json format
    // Body signifies the data of the request we want to send which should be in JSON
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uploadData),
      }),
      timeout(timer),
    ]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

*/

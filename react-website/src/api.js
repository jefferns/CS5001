import { useState } from 'react';
const queryString = require('query-string');


const URL = 'https://api.spotify.com/v1';

export const getAvailableDevices = async (token) => {
  const response = await fetch(URL + '/me/player/devices', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
  });
  return response;
};

export const transferPlayback = async (token, device_id) => {
  const response = await fetch(URL + '/me/player', {
    method: 'PUT',
    body: `{"device_ids":["${device_id}"]}`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return response;
};

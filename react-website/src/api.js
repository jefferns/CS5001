import { useState } from 'react';
const queryString = require('query-string');


const URL = 'https://api.spotify.com/v1';

export const getAvailableDevices = async (token) => {
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-users-available-devices
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
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/transfer-a-users-playback
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

export const searchSpotify = async (token, type, query, limit=10) => {
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/search
  const response = await fetch(URL + `/search?type=${type}&query=${query}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return response;
}

export const getTopItems = async (token, type, time_range='medium_term', limit=5) => {
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
  // type === 'artists' | 'tracks'
  // time_range === 'short_term' | 'medium_term' | 'long_term'
  const response = await fetch(URL + `/me/top/${type}?limit=${limit}&time_range=${time_range}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return response;
}

export const getRecommendations = async (token, seeds, type) => {
  // True if 'tracks' in seed type. This means [seeds] contains track items
  const tracks = type.indexOf('track') > -1;
  let query_url = '';
  tracks 
    ? query_url = 'seed_tracks='
    : query_url = 'seed_artists=';
  // append seed id to query url
  seeds.forEach(seed => query_url = query_url.concat(seed.id + ','));
  // remove trailing ','
  query_url = query_url.slice(0, -1)
  
  const response = await fetch(URL+`/recommendations?${query_url}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })
  return response;
}

// export const playSong(device_id, )
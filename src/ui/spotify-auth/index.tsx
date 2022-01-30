import { useEffect } from 'react';
import { APP_URL } from '../../constants';

const client_id = '500ff9e9af7042d0b81606887981a1a5';

const requiredScopes = 'user-read-currently-playing';

const buildAuthUrl = () => {
  return (
    'https://accounts.spotify.com/authorize' +
    '?response_type=token' +
    '&client_id=' +
    encodeURIComponent(client_id) +
    '&scope=' +
    encodeURIComponent(requiredScopes) +
    '&redirect_uri=' +
    encodeURIComponent(APP_URL)
  );
};

export const SpotifyAuth = () => {
  useEffect(() => {
    window.location.replace(buildAuthUrl());
  }, []);

  return null;
};

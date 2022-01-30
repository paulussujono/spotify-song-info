import React from 'react';
import { AppMain } from './src/ui';
import { SpotifyAuth } from './src/ui/spotify-auth';

const getSpotifyAccessTokenFromUrl = () => {
  const parsedHash = new URLSearchParams(
    window.location.hash.substr(1), // skip the first char (#)
  );
  return parsedHash.get('access_token');
};

const AppEntry = () => {
  const spotifyAccessToken = getSpotifyAccessTokenFromUrl();

  return spotifyAccessToken ? (
    <AppMain accessToken={spotifyAccessToken} />
  ) : (
    <SpotifyAuth />
  );
};

export default AppEntry;

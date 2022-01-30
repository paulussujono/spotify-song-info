import { useState, useEffect, useCallback } from 'react';
import Spotify from 'spotify-web-api-js';
import { APP_URL } from '../../constants';
import { SongMeta, SongAnalysis, SongInfo } from '../../types';

export const useSongInfo = (
  accessToken: string,
): {
  songInfo: SongInfo | undefined;
  isLoading: boolean;
  didError: boolean;
  refreshData: () => void;
} => {
  const [spotify] = useState(new Spotify());

  useEffect(() => {
    spotify.setAccessToken(accessToken);
  }, [accessToken, spotify]);

  const [isLoading, setIsLoading] = useState(false);
  const [didError, setDidError] = useState(false);
  const [songInfo, setSongInfo] = useState<SongInfo | undefined>();

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setDidError(false);
    try {
      const track = await spotify.getMyCurrentPlayingTrack();

      const trackItem = track?.item;
      if (!trackItem) {
        // no track is playing
        setSongInfo(undefined);
      } else {
        const { id, name, artists, album } = trackItem;
        const artist = artists[0]?.name;
        const albumArtUrl = album.images.find(
          ({ width }) => width === 300,
        )?.url;
        const songMeta: SongMeta = { id, name, artist, albumArtUrl };

        const { track } = await spotify.getAudioAnalysisForTrack(songMeta.id);
        const songAnalysis: SongAnalysis = {
          tempo: { value: track.tempo, confidence: track.tempo_confidence },
          timeSignature: {
            value: track.time_signature,
            confidence: track.time_signature_confidence,
          },
          key: { value: track.key, confidence: track.key_confidence },
          mode: { value: track.mode, confidence: track.mode_confidence },
        };
        setSongInfo({ meta: songMeta, analysis: songAnalysis });
      }
      setDidError(false);
    } catch (error) {
      if (
        error instanceof XMLHttpRequest &&
        error.status === 401 /* unauthorised */
      ) {
        // TODO do a better redirect to auth
        window.location.replace(APP_URL);
      }
      setSongInfo(undefined);
      setDidError(true);
    } finally {
      setIsLoading(false);
    }
  }, [spotify]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  console.log({
    songInfo,
    isLoading,
    didError,
    refreshData,
  });

  return {
    songInfo,
    isLoading,
    didError,
    refreshData,
  };
};

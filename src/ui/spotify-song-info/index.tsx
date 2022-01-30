import React from 'react';
import { useSongInfo } from '../../controllers/song-info';
import { getTonalPitchClasses, roundToNearestHalf, TONES } from '../../util';
import { Skeleton, Text, Image, Button, Heading } from 'native-base';

export const SpotifySongInfo = ({ accessToken }: { accessToken: string }) => {
  const { songInfo, isLoading, didError, refreshData } =
    useSongInfo(accessToken);

  return (
    <>
      <Skeleton h="40" w="40" isLoaded={!isLoading}>
        {songInfo && (
          <Image
            key={songInfo.meta.albumArtUrl}
            h="40"
            w="40"
            source={{
              uri: songInfo.meta.albumArtUrl || 'TODO placeholder',
            }}
            alt={`Album artwork for ${songInfo.meta.name}`}
          />
        )}
      </Skeleton>
      <Skeleton h="34" w="50" isLoaded={!isLoading}>
        {songInfo && (
          <>
            <Heading h="8">{songInfo.meta.name}</Heading>
            <Text h="10" fontSize="md" lineHeight={'20px'}>
              {songInfo.meta.artist}
            </Text>
            <Text h="6" fontSize="md" lineHeight={'20px'}>
              {`${roundToNearestHalf(songInfo.analysis.tempo.value)} bpm`}
            </Text>
            <Text h="10" fontSize="md" lineHeight={'20px'}>
              {`${
                TONES[
                  getTonalPitchClasses(
                    songInfo.analysis.key.value,
                    songInfo.analysis.mode.value,
                  ).major
                ]
              } Major`}
            </Text>
          </>
        )}
      </Skeleton>
      <Button onPress={refreshData}>Refresh</Button>
    </>
  );
};

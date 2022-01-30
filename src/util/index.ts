export const roundToNearestHalf = (value: number) => {
  return (Math.round(value * 2) / 2).toFixed(1);
};

export const TONES = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
];

const pitchClassToMinor = (minorPitchClass: number) => {
  return (minorPitchClass - 3 + 12) % 12;
};

const pitchClassToMajor = (pitchClass: number, isMajor: boolean) => {
  return isMajor ? pitchClass : (pitchClass + 3) % 12;
};

export const getTonalPitchClasses = (pitchClass: number, mode: number) => {
  const isMajor = mode === 1;
  const majorPitchClass = pitchClassToMajor(pitchClass, isMajor);
  const minorPitchClass = pitchClassToMinor(majorPitchClass);
  return {
    major: majorPitchClass,
    minor: minorPitchClass,
  };
};

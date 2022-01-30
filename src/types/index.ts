export type SongMeta = {
  id: string;
  name?: string;
  artist?: string;
  albumArtUrl?: string;
};

export type SongAnalysis = {
  tempo: { value: number; confidence: number };
  timeSignature: { value: number; confidence: number };
  key: { value: number; confidence: number };
  mode: { value: number; confidence: number };
};

export type SongInfo = {
  meta: SongMeta;
  analysis: SongAnalysis;
};

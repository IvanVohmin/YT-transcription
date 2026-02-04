declare module "youtube-transcript-plus" {
  export interface TranscriptEntry {
    text: string;
    duration: number;
    offset: number;
  }

  export class YoutubeTranscriptVideoUnavailableError extends Error {}
  export class YoutubeTranscriptDisabledError extends Error {}
  export class YoutubeTranscriptNotAvailableError extends Error {}
  export class YoutubeTranscriptNotAvailableLanguageError extends Error {}
}
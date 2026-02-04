import {
  fetchTranscript,
  YoutubeTranscriptVideoUnavailableError,
  YoutubeTranscriptDisabledError,
  YoutubeTranscriptNotAvailableError,
  YoutubeTranscriptNotAvailableLanguageError,
} from "youtube-transcript-plus";
import type { Request, Response } from "express";
import { isValidUrl } from "../utils/isValidUrl.js";
import { decodeHtml } from "../utils/decodeHtml.js";

export const getTranslation = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(403).json({
        success: false,
        error: "Provide URL of the youtube video.",
      });
    }

    if (!isValidUrl(url)) {
      return res.status(403).json({
        success: false,
        error: "Invalid URL provided.",
      });
    }

    const transcript = await fetchTranscript(url, {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.27 Safari/537.36',
    });

    const decodedTranscript = transcript.map((item) => ({
      ...item,
      text: decodeHtml(item.text),
    }));

    res.status(200).json({
      success: true,
      data: decodedTranscript,
    });
  } catch (err) {
    if (err instanceof YoutubeTranscriptVideoUnavailableError) {
      return res.status(403).json({
        success: false,
        error: "Video is unavailable.",
      });
    } else if (err instanceof YoutubeTranscriptDisabledError) {
      return res.status(404).json({
        success: false,
        error: "Transcription for this video is disabled.",
      });
    } else if (err instanceof YoutubeTranscriptNotAvailableError) {
      return res.status(403).json({
        success: false,
        error: "Video's translation is unavailable.",
      });
    } else if (err instanceof YoutubeTranscriptNotAvailableLanguageError) {
      return res.status(403).json({
        success: false,
        error: "Transcription for this language is not available.",
      });
    } else {
      return res.status(500).json({
        success: false,
        error:
          "An unexpected error occured while getting a translation, try again later.",
      });
    }
  }
};

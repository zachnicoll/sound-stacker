import { YouTubePlayer } from "react-youtube";

export type Source = {
  sourceId: string;
  player?: YouTubePlayer;
  volume?: number;
  title?: string;
  author?: string;
};

export type SoundStackState = {
  sources: Source[];
};

export type SoundStackProviderProps = {
  initialState?: SoundStackState;
};

export type SoundStackAction =
  | {
      type: "ADD_SOURCE";
      payload: string;
    }
  | {
      type: "UPDATE_PLAYER";
      payload: { sourceId: string; value: YouTubePlayer };
    }
  | {
      type: "REMOVE_SOURCE";
      // Index of source to delete
      payload: number;
    }
  | {
      type: "TOGGLE_ALL";
    };

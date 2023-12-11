import { produce } from "immer";
import { SoundStackState, SoundStackAction } from "./types";

const soundStackReducer = (state: SoundStackState, action: SoundStackAction) =>
  produce(state, (draft: SoundStackState) => {
    switch (action.type) {
      case "ADD_SOURCE": {
        draft.sources.push({
          sourceId: action.payload,
        });
        break;
      }

      case "UPDATE_PLAYER": {
        const s = draft.sources.find(
          (s) => s.sourceId === action.payload.sourceId
        );

        if (s) {
          s.player = action.payload.value;
          s.volume = s.player.getVolume();

          const { title, author } = s.player.getVideoData();
          s.title = title;
          s.author = author;
          s.loop = !!s.loop;
        }

        break;
      }

      case "TOGGLE_LOOP": {
        const s = draft.sources.find(
          (s) => s.sourceId === action.payload.sourceId
        );

        if (s) {
          s.loop = !s.loop;
        }

        break;
      }

      case "REMOVE_SOURCE": {
        draft.sources.splice(action.payload, 1);
        break;
      }

      case "TOGGLE_ALL": {
        const shouldPauseAll = draft.sources.some(
          (s) => s.player?.getPlayerState() === 1
        );

        draft.sources.forEach((s) =>
          shouldPauseAll ? s.player?.pauseVideo() : s.player?.playVideo()
        );
        break;
      }
    }

    // Write to storage
    const stateWithoutRef = {
      sources: draft.sources.map((s) => {
        const { player, ...rest } = s;
        return rest;
      }),
    };
    window.localStorage.setItem("soundstack", JSON.stringify(stateWithoutRef));
  });

export default soundStackReducer;

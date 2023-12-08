import { Dispatch, useContext } from "react";
import { SoundStackDispatchContext, SoundStackContext } from ".";
import { SoundStackAction, SoundStackState } from "./types";

export const useSoundStackDispatch = (): Dispatch<SoundStackAction> => {
  const dispatch = useContext(SoundStackDispatchContext);
  if (!dispatch) throw new Error("SoundStackDispatchContext is undefined!");

  return dispatch;
};

export const useSources = (): SoundStackState["sources"] => {
  const context = useContext(SoundStackContext);
  if (!context) throw new Error("SoundStackContext is undefined!");

  return context.sources;
};

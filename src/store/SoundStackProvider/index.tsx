import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";
import soundStackReducer from "./reducer";
import {
  SoundStackState,
  SoundStackAction,
  SoundStackProviderProps,
} from "./types";

export const SoundStackContext = createContext<SoundStackState | null>(null);
export const SoundStackDispatchContext =
  createContext<Dispatch<SoundStackAction> | null>(null);

const SoundStackProvider: React.FC<
  PropsWithChildren<SoundStackProviderProps>
> = ({ children }) => {
  const storedState = window.localStorage.getItem("soundstack");

  const [state, dispatch] = useReducer(
    soundStackReducer,
    storedState ? JSON.parse(storedState) : { sources: [] }
  );

  return (
    <SoundStackContext.Provider value={state}>
      <SoundStackDispatchContext.Provider value={dispatch}>
        {children}
      </SoundStackDispatchContext.Provider>
    </SoundStackContext.Provider>
  );
};

export default SoundStackProvider;

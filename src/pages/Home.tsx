import React, { ChangeEvent, useState } from "react";
import {
  Pane,
  majorScale,
  Group,
  TextInput,
  AddIcon,
  PauseIcon,
  Button,
  PlayIcon,
} from "evergreen-ui";
import Player from "../components/Player/Player";
import { useSoundStackDispatch, useSources } from "../store";

const formatSource = (src: string): string => {
  if (src.includes("youtube.com")) {
    return (
      src
        // Split at video id
        .split("v=")[1]
        // Split at query parameters, removing them
        .split("&")[0]
    );
  }

  return "";
};

const Home: React.FC = () => {
  const dispatchSoundStack = useSoundStackDispatch();
  const sources = useSources();
  const [sourceInput, setSourceInput] = useState<string>("");

  const pauseAll = sources.some((s) => s.player?.getPlayerState() === 1);

  const handleAddSource = (): void => {
    dispatchSoundStack({
      type: "ADD_SOURCE",
      payload: formatSource(sourceInput),
    });
  };

  const handleRemoveSource = (index: number): void => {
    dispatchSoundStack({
      type: "REMOVE_SOURCE",
      payload: index,
    });
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={majorScale(2)}
      gap={majorScale(2)}
      height="100%"
      overflow="hidden"
    >
      <Pane display="flex" gap={majorScale(2)}>
        <Group display="flex" justifyContent="center">
          <TextInput
            placeholder="Paste a youtube link here..."
            value={sourceInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSourceInput(e.target.value)
            }
          />

          <Button
            iconBefore={AddIcon}
            onClick={handleAddSource}
            appearance="primary"
            intent="success"
          >
            Stack
          </Button>
        </Group>

        <Button
          iconBefore={pauseAll ? PauseIcon : PlayIcon}
          onClick={() => dispatchSoundStack({ type: "TOGGLE_ALL" })}
        >
          {pauseAll ? "Pause All" : "Play All"}
        </Button>
      </Pane>

      <Pane
        overflowY="auto"
        display={"flex"}
        flexDirection="column"
        padding={majorScale(1)}
        gap={majorScale(2)}
        width="100%"
      >
        {sources.map((source, i) => (
          <Player
            key={source.sourceId}
            source={source}
            onDelete={() => handleRemoveSource(i)}
          />
        ))}
      </Pane>
    </Pane>
  );
};

export default Home;

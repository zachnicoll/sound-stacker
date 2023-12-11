import {
  Card,
  Text,
  majorScale,
  Group,
  IconButton,
  PlayIcon,
  PauseIcon,
  DeleteIcon,
  Spinner,
  Pane,
  Strong,
  VolumeUpIcon,
  RepeatIcon,
} from "evergreen-ui";
import { ChangeEventHandler, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { Source } from "../../store/SoundStackProvider/types";
import { useSoundStackDispatch } from "../../store";

interface PlayerProps {
  source: Source;
  onDelete: () => void;
}

const Player: React.FC<PlayerProps> = ({ source, onDelete }) => {
  const dispatchSoundStack = useSoundStackDispatch();

  const [playerState, setPlayerState] = useState<number>(-1);

  const onReady = (event: YouTubeEvent): void => {
    dispatchSoundStack({
      type: "UPDATE_PLAYER",
      payload: {
        sourceId: source.sourceId,
        value: event.target,
      },
    });
  };

  // TODO: use dispatch for this
  const playPause = (): void => {
    if (!source.player) return;

    if (source.player.getPlayerState() !== 1) {
      source.player.playVideo();
    } else {
      source.player.pauseVideo();
    }
  };

  const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    if (!source.player) return;

    source.player.setVolume(event.target.value);

    dispatchSoundStack({
      type: "UPDATE_PLAYER",
      payload: {
        sourceId: source.sourceId,
        value: source.player,
      },
    });
  };

  const handleLoop = (): void => {
    if (!source.player) return;
    if (source.loop) source.player.playVideo();
  };

  return (
    <Card
      display="flex"
      alignItems="center"
      flex={1}
      elevation={1}
      padding={majorScale(2)}
    >
      <YouTube
        videoId={source.sourceId}
        onReady={onReady}
        onStateChange={(e) => setPlayerState(e.target.getPlayerState())}
        onEnd={handleLoop}
        className="invisible-player"
        onError={console.info}
      />

      {source.player ? (
        <Pane display="flex" flexDirection="column" flex={1}>
          <Pane
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Strong>{source.title}</Strong>
            <Text>{source.author}</Text>
          </Pane>

          <Pane
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={majorScale(1)}
          >
            <VolumeUpIcon color="#474d66" />

            <input
              type="range"
              value={source.volume}
              max={100}
              min={0}
              onChange={handleVolumeChange}
              style={{ flex: 1 }}
            />

            <Group>
              <IconButton
                onClick={playPause}
                icon={playerState !== 1 ? <PlayIcon /> : <PauseIcon />}
              />

              <IconButton
                onClick={() =>
                  dispatchSoundStack({
                    type: "TOGGLE_LOOP",
                    payload: { sourceId: source.sourceId },
                  })
                }
                icon={<RepeatIcon />}
                intent={source.loop ? "success" : "none"}
              />

              <IconButton
                onClick={onDelete}
                icon={DeleteIcon}
                intent="danger"
              />
            </Group>
          </Pane>
        </Pane>
      ) : (
        <Spinner />
      )}
    </Card>
  );
};

export default Player;

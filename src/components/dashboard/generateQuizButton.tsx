import { useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { Button, Progress } from '@mantine/core';

interface GenerateQuizButtonProps {
  loaded: boolean;
  setLoaded: (value: boolean) => void;
  onClick: () => any;
}

export default function GenerateQuizButton({loaded, setLoaded, onClick}: GenerateQuizButtonProps) {
  const [progress, setProgress] = useState(0);

  const [direction, setDirection] = useState(0);

  const interval = useInterval(
    () =>
      setProgress((current) => {

        if (loaded == true) {
          interval.stop();
          return 0;
        }

        if (direction == 0) {
            if (current + 1 > 100) {
              setDirection(1);
            }
            return current + 1;
        } else {
          if (current - 1 < 0) {
            setDirection(0);
          }
          return current - 1;
        }

      }),
    100
  );
  return (
    <Button
      fullWidth
      className="bg-blue-600 hover:bg-blue-600"
      onClick={() => {
        (loaded ? setLoaded(false) : !interval.active && interval.start());
        onClick();
      }
      }
    >
      <div className="relative z-10">
        {progress !== 0 ? 'Generating Quiz' : loaded ? 'Quiz Generated!' : 'Generate Quiz'}
      </div>
      {progress !== 0 && (
        <Progress
          value={progress}
          className="absolute bottom-1 left-1 right-1 top-1 h-auto bg-transparent z-0"
          color={"blue"}
        />
      )}
    </Button>
  );
}
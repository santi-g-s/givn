import { useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { Button, Progress } from '@mantine/core';

interface GenerateQuizButtonProps {
  loaded: boolean;
  setLoaded: (value: boolean) => void;
}

export default function GenerateQuizButton({loaded, setLoaded}: GenerateQuizButtonProps) {
  const [progress, setProgress] = useState(0);

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 0;
      }),
    20
  );
  return (
    <Button
      fullWidth
      className="bg-blue-600 hover:bg-blue-600"
      onClick={() => (loaded ? setLoaded(false) : !interval.active && interval.start())}
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
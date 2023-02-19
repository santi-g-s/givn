import {
  Divider,
  Modal,
  Radio,
  Space,
  Title,
  Text,
  Container,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";
import GenerateQuizButton from "./generateQuizButton";
import { IClass, ITask } from "./learn";

interface LessonModalProps {
  currentTask: ITask | undefined;
  setCurrentTask: (value: ITask | undefined) => void;
  onSuccess: (value: ITask) => any;
}

interface IQuestion {
  question: string;
  choices: string[];
  answer: string;
}

export default function LessonModal({
  currentTask,
  setCurrentTask,
  onSuccess,
}: LessonModalProps) {
  const [loaded, setLoaded] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[] | []>([]);

  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    setLoaded(false);
  }, []);

  const generateQuiz = async () => {
    const res = await axios.post("/api/fetch-gpt-questions", {
      text: currentTask?.articleText,
    });
    console.log(res.data);
    setLoaded(true);
    const tempQuestions = [] as any[];
    for (let i = 0; i < res.data.output.length; i++) {
      const obj: IQuestion = {
        question: res.data.output[i].question,
        choices: res.data.output[i].choices,
        answer: res.data.output[i].answer,
      };
      tempQuestions.push(obj);
    }
    setQuestions(tempQuestions);
  };

  const items = questions.map((data, index) => (
    <Radio.Group
      value={answers[index]}
      onChange={(value) => {
        let tempAnswers = [] as string[]
        tempAnswers = tempAnswers.concat(answers);
        tempAnswers[index] = value;
        setAnswers(tempAnswers);
      }}
      mx="xl"
      name={`question_group_${index}`}
      orientation="vertical"
      label={data.question}
      mt="xl"
    >
      {data.choices.map((choice) => (
        <Radio value={choice} label={choice} />
      ))}
    </Radio.Group>
  ));

  const onFailure = () => {
    showNotification({
        autoClose: 3000,
        color: "red",
        title: "Almost there!",
        message: "At least one of your answers is wrong. Give it another go!",
    });
  }

  return (
    <Modal
      centered
      size="100%"
      opened={currentTask != undefined}
      onClose={() => {
        setLoaded(false);
        setCurrentTask(undefined);
      }}
    >
      <Container>
        <Title my="xl">{currentTask?.title}</Title>
        <Text>{currentTask?.articleText}</Text>

        <Space h="xl"></Space>

        {!loaded ? (
          <GenerateQuizButton
            loaded={loaded}
            setLoaded={setLoaded}
            onClick={generateQuiz}
          ></GenerateQuizButton>
        ) : (
          <>
            <Divider></Divider>
            <Title my="xl">Quiz</Title>

            {items}

            <Space h="xl"></Space>
            <Space h="xl"></Space>

            <div className="flex justify-items-end">
              <div className="grow"></div>
              <button
                onClick={async () => {
                  var isCorrect = true;
                  for (let i = 0; i < answers.length; i++) {
                    if (answers[i] != questions[i].answer) {
                      isCorrect = false;
                    }
                  }
                  console.log(answers);
                  if (isCorrect) {
                    onSuccess(currentTask!);
                  } else {
                    onFailure();
                  }
                  
                }}
                type="button"
                className="text-black border rounded-lg py-2 text-left px-4 w-fit hover:bg-blue-500 hover:border-white hover:text-white transition"
              >
                Submit Answers
              </button>
            </div>
          </>
        )}

        <Space h="xl"></Space>
        <Space h="xl"></Space>
        <Space h="xl"></Space>
      </Container>
    </Modal>
  );
}

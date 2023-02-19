import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPTAPI } from "chatgpt";

async function generate_mcq(text: string, api: any) {
  const prompt = `Generate 3 multiple choice questions (A,B,C,D) with one correct answer based on the following article:\n${text}\n\nQuestion 1:`;

  let response = await api.sendMessage(prompt);

  let question = response.text;
  let options = response.text.split("\n").slice(1);

  let answer = options[0];

  return { question, options, answer };
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const model = "text-davinci-003";
    const temperature = 0.5;
    const max_tokens = 1500;
    const stop = ["\n\n"];
    const api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY || "",
      completionParams: {
        model,
        temperature,
        max_tokens,
        stop,
      },
    });

    const { text } = req.body;

    const mcq_questions = <any>[];
    const res1 = await generate_mcq(text, api);
    mcq_questions.push(res1);
    const res2 = await generate_mcq(text, api);
    mcq_questions.push(res2);
    const res3 = await generate_mcq(text, api);
    mcq_questions.push(res3);

    let output = <any>[];
    let QCA = {} as any;

    console.log("MCQ", mcq_questions);

    for (let i = 0; i < mcq_questions.length; i++) {
      QCA["question"] = mcq_questions[i].question.split("\n")[0];
      let choices = <any>[];
      for (let j = 0; j < mcq_questions[i].options.length; j++) {
        choices.push(mcq_questions[i].options[j].slice(3));
      }
      QCA["choices"] = choices;
      QCA["answer"] = mcq_questions[i].answer.slice(3);
      output.push(QCA);
      QCA = {} as any;
    }

    return res.status(200).json({ output });
  } catch (e: any) {
    console.log("e", e.message || "");
    return res.status(500).json({ error: e.message || "Unexpected error." });
  }
};

export default handler;

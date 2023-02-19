import openai
import random
import argparse

# Function to generate multiple choice questions with one correct answer
def generate_mcq(article_text):
    # Set up OpenAI API parameters
    prompt = f"Generate 3 multiple choice questions (A,B,C,D) with one correct answer based on the following article:\n{article_text}\n\nQuestion 1:"
    model = "text-davinci-003"
    temperature = 0.5
    max_tokens = 1500
    n = 3
    stop = "\n\n"

    # Use OpenAI API to generate questions
    response = openai.Completion.create(
        engine=model,
        prompt=prompt,
        temperature=temperature,
        max_tokens=max_tokens,
        n=n,
        stop=stop
    )

    # Parse the response and return questions
    questions = []
    for i in range(n):
        question = response.choices[i].text.strip()
        options = response.choices[i].text.strip().split("\n")[1:]
        answer = options[0]
        random.shuffle(options)
        questions.append({
            "question": question,
            "options": options,
            "answer": answer
        })

    return questions

def main():
    parser = argparse.ArgumentParser(description="Input article text string.")
    parser.add_argument("--text", metavar="input", type=str, help="input article text string")
    args = parser.parse_args()

    # Set up OpenAI API key
    openai.api_key = "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"

    # Get article link from user
    article_link = args.text

    # Generate multiple choice questions with one correct answer
    mcq_questions = generate_mcq(article_link)

    output = []
    QCA = {}
    # Print the questions
    for i in range(len(mcq_questions)):
        QCA["question"] = mcq_questions[i]['question'].split("?")[0] + "?"
        choices = []
        for j in range(len(mcq_questions[i]['options'])):
            choices.append((mcq_questions[i]['options'][j].split(".")[-1])[1:])
        QCA["choices"] = choices 
        QCA["answer"] = (mcq_questions[i]['answer'].split(".")[-1])[1:]
        output.append(QCA)
        QCA = {}
    
    print(output)
    
    return output

main()
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

serve(async (req) => {
  const triviaResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "trivia question generator",
          },
          {
            role: "user",
            content: `system instructions: create a trivia question for a trivia question application that will be sent out randomly throughout the day. The trivia question will be on the topic of math, and the difficulty will be at a 6-10th grade level. The trivia question should have 4 multiple choice responses (A, B, C, D).

          The response should be formatted as a JSON file
          
          Your task is to create a new trivia question for 4 different topics (math, english, science, and history). generate the questions in an array format with a group key named after the topic.`,
          },
        ],
      }),
    }
  )

  const json = await triviaResponse.json()
  const triviaQuestions = json.choices[0].message.content

  console.log(`Trivia questions:\n${JSON.stringify(triviaQuestions, null, 4)}`)
})

import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

serve(async (req) => {
  const dailyPromptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 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", // REPLACE_OPENAI_API_KEY",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "daily prompt generator",
        },
        {
          role: "user",
          content: `everyday you will create a prompt that encourages the reader to be more studious on a productivity application. the reader will follow the prompt and post a picture online that shows that completing the task to prove that they are studying. for an example a prompt could be: "go to the library to study". your prompt will give users new ideas on how to boost their productivity and change up their way of studying. generate 1 prompt with simple vocabulary that are easy and accessible actions in 1 sentence. don't use a phrase similar to "post it online" or "share a picture"  since the users already know to do that.`,
        },
      ],
    }),
  })

  const json = await dailyPromptResponse.json();
  const dailyPrompt = json.choices[0].message.content;

 
})
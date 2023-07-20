// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

// const { Configuration, OpenAIApi } = require("openai")

// const config = new Configuration({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// })

serve(async (req) => {
  const { query } = await req.json()

  console.log(`Query: ${JSON.stringify(query)}`)

  const runPrompt = async () => {
    // const response = await OpenAIApi.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "trivia prompt generator",
    //     },
    //     {
    //       role: "user",
    //       content: `everyday you will create a prompt that encourages the reader to be more studious on a trivia application. the reader will follow the prompt and post a picture online that shows that completing the task to prove that they are studying. for an example a prompt could be: "go to the library to study". your prompt will give users new ideas on how to boost their productivity and change up their way of studying. generate 1 prompt with simple vocabulary that are easy and accessible actions in 1 sentence. don't use a phrase similar to "post it online" or "share a picture"  since the users already know to do that.`,
    //     },
    //   ],
    // })
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "trivia prompt generator",
        },
        {
          role: "user",
          content: `everyday you will create a prompt that encourages the reader to be more studious on a trivia application. the reader will follow the prompt and post a picture online that shows that completing the task to prove that they are studying. for an example a prompt could be: "go to the library to study". your prompt will give users new ideas on how to boost their productivity and change up their way of studying. generate 1 prompt with simple vocabulary that are easy and accessible actions in 1 sentence. don't use a phrase similar to "post it online" or "share a picture"  since the users already know to do that.`,
        },
      ],
    }),
  })

  const json = await response.json()

  console.log(json.data.choices[0])
  console.log(json)

  return json
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'

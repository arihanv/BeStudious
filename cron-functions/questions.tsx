// export default function

// const {Configuration, OpenAIApi} = require("openai");

// const config = new Configuration({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });

// const runPrompt = async () => {
//     const response = await OpenAIApi.createChatCompletion({
//         model:"gpt-3.5-turbo",
//         messages: [
//             {
//                 "role": "system",
//                 "content": "trivia prompt generator",
//             },
//             {
//                 "role": "user",
//                 "content": `everyday you will create a prompt that encourages the reader to be more studious on a trivia application. the reader will follow the prompt and post a picture online that shows that completing the task to prove that they are studying. for an example a prompt could be: "go to the library to study". your prompt will give users new ideas on how to boost their productivity and change up their way of studying. generate 1 prompt with simple vocabulary that are easy and accessible actions in 1 sentence. don't use a phrase similar to "post it online" or "share a picture"  since the users already know to do that.`
//             }
//         ]
//     })
// }

//@ts-nocheck
import Deno, { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { CreateCompletionRequest } from "openai"

serve(async (req) => {
  const { query } = await req.json()

  const completionConfig: CreateCompletionRequest = {
    model: "text-davinci-003",
    prompt: query,
    max_tokens: 256,
    temperature: 0,
    stream: true,
  }

  return fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completionConfig),
  })
})

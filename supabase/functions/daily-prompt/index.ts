//@ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get("SUPABASE_URL")
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
const supabaseOptions = { auth: { persistSession: false } } // Disable session persistence

serve(async (req) => {
  console.log("Querying prompt from OpenAI...")

  const dailyPromptResponse = await fetch(
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
            content: "daily prompt generator",
          },
          {
            role: "user",
            content: `everyday you will create a prompt that encourages the reader to be more studious on a productivity application. the reader will follow the prompt and post a picture online that shows that completing the task to prove that they are studying. for an example a prompt could be: go to the library to study. your prompt will give users new ideas on how to boost their productivity and change up their way of studying. generate 1 prompt with simple vocabulary that are easy and accessible actions in 1 sentence. don't use a phrase similar to "post it online" or "share a picture"  since the users already know to do that. give me the prompt in json format. for example: {"prompt": "Go to the library with your best buds."}`,
          },
        ],
      }),
    }
  )

  const json = await dailyPromptResponse.json()
  console.log(json)
  const dailyPrompt = JSON.parse(json.choices[0].message.content).prompt

  console.log(`Daily prompt: ${dailyPrompt}`)

  console.log("Inserting into Supabase...")

  const supabaseClient = createClient(supabaseUrl, supabaseKey, supabaseOptions)

  const { data, error } = await supabaseClient
    .from("daily_prompt")
    .insert([
      {
        prompt: dailyPrompt,
      },
    ])
    .select()

  if (error) {
    console.error("Error inserting data: ", error)
  } else {
    console.log(
      `Inserted into Supabase. Response:\n${JSON.stringify(data, null, 4)}`
    )
  }

  return 200
})

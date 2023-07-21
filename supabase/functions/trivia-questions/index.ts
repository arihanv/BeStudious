import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get("SUPABASE_URL")
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
const supabaseOptions = { auth: { persistSession: false } } // Disable session persistence

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
  console.log(json)
  const triviaQuestions = JSON.parse(json.choices[0].message.content).questions

  console.log(`Trivia questions:\n${JSON.stringify(triviaQuestions, null, 4)}`)

  console.log("Inserting into Supabase...")

  const supabaseClient = createClient(supabaseUrl, supabaseKey, supabaseOptions)

  const { data, error } = await supabaseClient
    .from("trivia_questions")
    .insert([
      {
        questions: triviaQuestions,
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

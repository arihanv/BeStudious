//@ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import dJSON from "https://esm.sh/dirty-json"

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
            content: `Your job is to create difficult trivia questions for a trivia question application that will be sent out every day. Each trivia question should have 4 multiple choice responses (A, B, C, D). Respond with a JSON array, with an object for each topic containing the keys "topic", "question", "choices" and "correctAnswer". Example: [{"topic":"math","question":"....?","choices":{"A":"8","B":"10","C":"12","D":"16"},"correctAnswer":"C"}, {"topic":"english", ...}]. `,
          },
          {
            role: "user",
            content: `Generate trivia questions for math, english, science, and history.`,
          },
        ],
      }),
    }
  )

  const json = await triviaResponse.json()
  console.log(json)
  const triviaQuestions = dJSON.parse(json.choices[0].message.content)

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

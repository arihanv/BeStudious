import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://mwqdtatdhlgqhyszfvwn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cWR0YXRkaGxncWh5c3pmdnduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTU2MTg3NiwiZXhwIjoyMDA1MTM3ODc2fQ.XWglUn5LLyYhY44j322snuM_jzebcYGhN8EAhE4jWIs';
const supabaseOptions = {auth: { persistSession: false }}; // Disable session persistence

console.log(process.env)

const supabaseClient = createClient(supabaseUrl, supabaseKey, supabaseOptions);

export default supabaseClient;

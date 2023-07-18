import { createClient } from "@supabase/supabase-js";

const supabaseUrl = PROJECT_URL;
const supabaseKey = SERVICE_ROLE_KEY;
const supabaseOptions = {auth: { persistSession: false }}; // Disable session persistence

console.log(process.env)

const supabaseClient = createClient(supabaseUrl, supabaseKey, supabaseOptions);

export default supabaseClient;

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_PROJECT_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY;
const supabaseOptions = {auth: { persistSession: false }}; // Disable session persistence

console.log(process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY);

const supabaseClient = createClient(supabaseUrl, supabaseKey, supabaseOptions);

export default supabaseClient;

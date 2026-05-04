import { createClient } from '@supabase/supabase-js';



const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

const supabaseurl = SUPABASE_URL
const supabasekey = SUPABASE_ANON_KEY


const supabase = createClient(supabaseurl, supabasekey);
export default supabase;
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://xvurjffwcgskjxgoxyyd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dXJqZmZ3Y2dza2p4Z294eXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MDc1NjksImV4cCI6MjA5NzQ4MzU2OX0.FAT98qIN8zL7fi2P3Vv615ijMlePrAxWz2_7LvavqfQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
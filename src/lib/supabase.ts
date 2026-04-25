import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Tüm Supabase isteklerinde önbelleği tamamen devre dışı bırakan özel fetch
const noStoreFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  return fetch(input, {
    ...init,
    cache: 'no-store',
  });
};

// Client-side (browser) Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: noStoreFetch,
  },
});

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const IS_TEST_MODE = import.meta.env.MODE === 'test' || import.meta.env.VITEST === 'true';

if (!IS_TEST_MODE && (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY)) {
  throw new Error(
    'Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.'
  );
}

export const supabase =
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;

export function ensureSupabaseClient() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.'
    );
  }
  return supabase;
}

export async function getSupabaseSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session || null;
}

export async function getSupabaseAccessToken() {
  const session = await getSupabaseSession();
  return session?.access_token || null;
}

export async function refreshSupabaseSession() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.refreshSession();
  if (error || !data.session) return null;
  return data.session;
}

export function onSupabaseAuthStateChange(callback) {
  if (!supabase) {
    return { unsubscribe: () => undefined };
  }
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(callback);
  return {
    unsubscribe: () => subscription.unsubscribe(),
  };
}

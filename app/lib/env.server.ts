function getEnvValue(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseUrl() {
  return getEnvValue("SUPABASE_URL");
}

export function getSupabasePublishableKey() {
  return (
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    getEnvValue("SUPABASE_PUBLISHABLE_KEY")
  );
}

export function getSupabaseServiceRoleKey() {
  return getEnvValue("SUPABASE_SERVICE_ROLE_KEY");
}

export type OAuthProvider = "google" | "linkedin" | "microsoft";

const PROVIDER_ENV: Record<OAuthProvider, [string, string]> = {
  google: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
  linkedin: ["LINKEDIN_CLIENT_ID", "LINKEDIN_CLIENT_SECRET"],
  microsoft: ["AZURE_AD_CLIENT_ID", "AZURE_AD_CLIENT_SECRET"],
};

export function getEnabledOAuthProviders(): OAuthProvider[] {
  return (Object.keys(PROVIDER_ENV) as OAuthProvider[]).filter((provider) => {
    const [clientId, clientSecret] = PROVIDER_ENV[provider];
    return Boolean(process.env[clientId] && process.env[clientSecret]);
  });
}

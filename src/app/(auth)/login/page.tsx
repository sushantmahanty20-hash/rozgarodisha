import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { getEnabledOAuthProviders } from "@/lib/oauth-providers";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm oauthProviders={getEnabledOAuthProviders()} />
    </Suspense>
  );
}

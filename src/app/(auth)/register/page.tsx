import { Suspense } from "react";
import { RegisterForm } from "./register-form";
import { getEnabledOAuthProviders } from "@/lib/oauth-providers";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm oauthProviders={getEnabledOAuthProviders()} />
    </Suspense>
  );
}

import { Suspense } from "react";
import { SignInSection } from "./_components/signin-section";

export default function SiginInPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SignInSection />
      </Suspense>
    );
  }
  
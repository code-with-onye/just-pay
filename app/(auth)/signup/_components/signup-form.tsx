"use client";
import { SignupStep1 } from "./signup-step1";
import { SignupStep2 } from "./signup-step2";

import { useSignupStep } from "../_hooks/store/useSignupStore";
import Link from "next/link";
import { AuthSideBanner } from "@/components/shared/auth-sidebanner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SignUpForm = () => {
  const { step } = useSignupStep();
  
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Link
        href="/signin"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        SignIn
      </Link>
      <AuthSideBanner
        text=" &ldquo;This library has saved me countless hours of work and
                  helped me deliver stunning designs to my clients faster than
                  ever before.&rdquo;"
      />
      <div className="lg:p-8 p-4 w-full">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-4xl font-semibold tracking-tight">
              Join JustDues
            </h1>
            <p className="text-sm text-muted-foreground font-semibold">
              {" It's free - Pay your school dues with ease "}
            </p>
          </div>
          {step === 0 ? <SignupStep1 /> : <SignupStep2 />}
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useState, useTransition } from "react";
import { ImGoogle, ImSpinner6 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSearchParams } from "next/navigation";

import { Signin } from "../_mutation/signin";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SigninSchema } from "../../_schema";
import { useToast } from "@/components/ui/use-toast";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: UserAuthFormProps) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();


  const searchParams = useSearchParams();

  const getUrlError =
    searchParams.get("error") === "CredentialsSignin" &&
    "Invalid email or password";

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninSchema>) {
    setError("");
    setSuccess("");
    

    startTransition(() => {
      Signin(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
            toast({
              title: "Error",
              description: data.error,
              variant: "destructive",
            });
          }

          // if (data?.success) {
          //   form.reset();
          //   setSuccess(data.success);
          // }

          // if (data?.twoFactor) {
          //   setShowTwoFactor(true);
          // }
        })
        .catch(() => setError("Something went wrong"));
    });
  }

  const googleSignIn = async () => {};

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-1">
                      <Input
                        id="email"
                        placeholder="jon@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-1">
                      <Label className="sr-only" htmlFor="password">
                        Business Name
                      </Label>
                      <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        disabled={isPending}
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          

            <Button disabled={isPending}>
              {isPending && (
                <ImSpinner6 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isPending}
        onClick={googleSignIn}
      >
        {isPending ? (
          <ImSpinner6 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ImGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Sign Up with Google
      </Button>
    </div>
  );
}

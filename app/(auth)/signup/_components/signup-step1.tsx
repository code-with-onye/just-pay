"use client";

import * as React from "react";
import { ImGoogle, ImSpinner6 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";

// import { Icons } from "@/components/icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSignUpStore, useSignupStep } from "../_hooks/store/useSignupStore";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().optional(),
});

export function SignupStep1({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user, setUser } = useSignUpStore();
  const { moveForward, step } = useSignupStep();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "" || user?.email,
      phone: "" || user?.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setUser({ ...user, ...values });
    moveForward();
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        {/* <form onSubmit={onSubmit}> */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3 ">
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

            {/* Business name */}

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-1">
                      <Label className="sr-only" htmlFor="phone">
                        Business Name
                      </Label>

                      <Input
                        id="phone"
                        placeholder="phone number"
                        type="phone"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} isLoading={isLoading}>
              Continue
            </Button>
          </div>
        </form>
      </Form>

      <div className={cn("relative", step !== 0 && "hidden")}>
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
        disabled={isLoading}
        className={cn("relative", step !== 0 && "hidden")}
        isLoading={isLoading}
      >
        <ImGoogle className="mr-2 h-4 w-4" />
        Sign Up with Google
      </Button>
    </div>
  );
}

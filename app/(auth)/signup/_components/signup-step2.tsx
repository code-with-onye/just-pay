"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ImSpinner6 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { useSignUpStore, useSignupStep } from "../_hooks/store/useSignupStore";
import { SignUp } from "../_mutation/signup";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  password: z.string().min(1, { message: "Please enter a password" }),
});

export const SignupStep2 = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { user, setUser } = useSignUpStore();
  const { moveBack } = useSignupStep();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...user, ...values });

    startTransition(() => {
      SignUp({ ...user, ...values }).then((res) => {
        setError(res.error);
        toast({
          title: "Error",
          description: res.error || "Something went wrong",
          variant: "destructive",
        });
        if (res.success) {
          setUser({
            phone: "",
            email: "",
            password: "",
          });

          router.push("/signin");
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-3 ">
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
          <Button disabled={isPending} isLoading={isPending}>
            Create Account
          </Button>
        </div>
      </form>
      {error && (
        <Button
          disabled={isPending}
          variant="outline"
          onClick={() => moveBack()}
          className="w-full"
        >
          {isPending && <ImSpinner6 className="mr-2 h-4 w-4 animate-spin" />}
          Back
        </Button>
      )}
    </Form>
  );
};

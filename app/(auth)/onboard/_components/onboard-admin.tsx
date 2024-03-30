"use client";
import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {useRouter} from "next/navigation"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

import useRoleStore from "../_hooks/store";
import { OnboardAdminSchema } from "../_schema";
import { useOnboardAdmin } from "../_hooks/mutation";

export const OnboardAdmin = () => {

  const router = useRouter()
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { role } = useRoleStore();

  const form = useForm<z.infer<typeof OnboardAdminSchema>>({
    resolver: zodResolver(OnboardAdminSchema),
    defaultValues: {
      role: role === "ADMIN" ? "ADMIN" : "USER",
      firstname: "",
      lastname: "",
      accountNumber: "",
    },
  });

  // Reset form fields based on the selected role

  function onSubmit(values: z.infer<typeof OnboardAdminSchema>) {
    console.log(values);

    startTransition(() => {
      useOnboardAdmin(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.message);
            toast({
              title: "Error",
              description: data.message,
              variant: "destructive",
            });
          } else {
            form.reset();
            setSuccess(data?.success);
            toast({
              title: "Success",
              description: data?.success,
              variant: "default",
            });
            router.push("/admin");
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your account number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} isLoading={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

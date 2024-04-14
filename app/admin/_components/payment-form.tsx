"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { createPayment } from "../_mutation/payment";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.string(),
});

export const PaymentForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      createPayment({
        title: values.name,
        link: "",
        price: values.price,
        adminId: "",
      })
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
            toast({
              title: "Error",
              description: data.error,
              variant: "destructive",
            });
          } else {
            form.reset();
            console.log(data.data);
            setSuccess(data.success);
            toast({
              title: "Success",
              description: data.success,
              variant: "default",
            });
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 my-4">
        <h3 className="text-lg font-semibold">Crate payment link</h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Text book" {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>What are they paying for?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="N4,000" {...field} disabled={isPending} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} isLoading={isPending}>Submit</Button>
      </form>
    </Form>
  );
};

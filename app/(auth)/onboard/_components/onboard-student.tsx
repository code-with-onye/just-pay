"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useRoleStore from "../_hooks/store";
import { cn } from "@/lib/utils";
import { OnboardStudentSchema } from "../_schema";
import { useToast } from "@/components/ui/use-toast";
import { useOnboardStudent } from "../_hooks/mutation";

export const OnboardStudent = () => {
  const { role } = useRoleStore();
  const [step, setStep] = useState(0);

  const router = useRouter();
  const [, setError] = useState<string | undefined>("");
  const [, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const moveForward = () => {
    setStep(step + 1);
  };

  const moveBack = () => {
    setStep(step - 1);
  };

  const form = useForm<z.infer<typeof OnboardStudentSchema>>({
    resolver: zodResolver(OnboardStudentSchema),
    defaultValues: {
      role: role === "ADMIN" ? "ADMIN" : "USER",
      firstname: "",
      lastname: "",
      othername: "",
      department: "",
      tribe: "",
      state: "",
      gender: "",
    },
  });

  function onSubmit(values: z.infer<typeof OnboardStudentSchema>) {
    console.log(values);

    startTransition(() => {
      useOnboardStudent(values)
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
            router.push("/overview");
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 0 && (
          <>
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
              name="othername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your other name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tribe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tribe</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your tribe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State of Origin</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your state of origin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {step === 0 ? (
          <div
            className={cn(buttonVariants({ variant: "default" }))}
            onClick={moveForward}
          >
            Next step
          </div>
        ) : (
          <div className="flex gap-x-2 items-center">
            <div
              className={cn(
                buttonVariants({ variant: "outline" }),
                "cursor-pointer"
              )}
              onClick={moveBack}
            >
              Back
            </div>
            <Button type="submit" disabled={isPending} isLoading={isPending}>
              Submit
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

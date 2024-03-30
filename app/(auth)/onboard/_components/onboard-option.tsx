"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import useRoleStore from "../_hooks/store";
import { cn } from "@/lib/utils";

export const OnboardOption = () => {
  const { role, setRole } = useRoleStore();

  return (
    <div className="flex h-40 justify-center w-full">
      <Card className="w-full items-start mx-auto max-w-2xl">
        <CardHeader>
          <CardDescription>How do you want to use JustDues</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-x-2">
          <div
            className={cn(
              "p-3 border rounded w-full grid place-content-center shadow hover-card cursor-pointer",
              role === "ADMIN" ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => setRole("ADMIN")}
          >
            ADMIN
          </div>
          <div
            className={cn(
              "p-3 border rounded w-full grid place-content-center shadow hover-card cursor-pointer",
              role === "USER" ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => setRole("USER")}
          >
            STUDENT
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

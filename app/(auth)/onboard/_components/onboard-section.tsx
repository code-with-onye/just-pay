"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useRoleStore from "../_hooks/store";
import { OnboardAdmin } from "./onboard-admin";
import { OnboardStudent } from "./onboard-student";
import { OnboardOption } from "./onboard-option";

export const OnboardSection = () => {
  const { role } = useRoleStore();
  return (
    <Card className="w-full items-start mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Provide your correct details about yourself
        </CardDescription>
        <OnboardOption />
      </CardHeader>
      <CardContent>
        {role === "ADMIN" ? <OnboardAdmin /> : <OnboardStudent />}
      </CardContent>
    </Card>
  );
};

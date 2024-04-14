"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

import { PaymentLink } from "@prisma/client";
import { Delete, Edit, Link, MoreVertical } from "lucide-react";
import { startTransition, useState, useTransition } from "react";
import { deletePaymentLinkByAdminId } from "../_mutation/payment";
import useCopyToClipboard from "@/hooks/clipboard";

export const PaymentCard = ({
  createdPaymentLinks,
}: {
  createdPaymentLinks: PaymentLink;
}) => {
  const { toast } = useToast();
  const [, copyToClipboard] = useCopyToClipboard();

  function onCopy(link: string) {
    copyToClipboard(link);
    toast({
      title: "Success",
      description: "Copied to clipboard",
      variant: "default",
    })
  }

  function onDeletePaymentLink(id: string) {
    startTransition(() => {
      deletePaymentLinkByAdminId(id)
        .then((data) => {
          if (data?.error) {
            toast({
              title: "Error",
              description: data.error,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Success",
              description: data?.success,
              variant: "default",
            });
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        });
    });
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>
          <div className="flex w-full items-center justify-between">
            <p>{createdPaymentLinks.title}</p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="text-gray-500 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem className="inline-flex items-center gap-x-2">
                  <Edit /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="inline-flex items-center gap-x-2 text-red-500"
                  onClick={() => onDeletePaymentLink(createdPaymentLinks.id)}
                >
                  <Delete /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardDescription>
        <CardTitle className="text-4xl">
          N{parseFloat(createdPaymentLinks.price)}
        </CardTitle>
      </CardHeader>
      {/* <CardContent>
        <div className="text-xs text-muted-foreground">+25% from last week</div>
      </CardContent> */}
      <CardFooter className="">
        <div className="flex items-center justify-between w-full">
          <Button className="" size="sm">
            View Transaction
          </Button>
          <div
            className="inline-flex items-center gap-x-2 text-sm bg-slate-100 p-1.5 rounded-md hover:shadow-lg cursor-pointer"
            onClick={() => onCopy(createdPaymentLinks.link as string)}
          >
            <Link />
            Share Link
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

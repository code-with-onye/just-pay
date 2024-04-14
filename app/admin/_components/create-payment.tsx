"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PaymentForm } from "./payment-form";

export default function CreatePayment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Your Orders</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Easily create payment link for anyone to pay you. Track all
              transactions for every link created.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => setIsModalOpen(true)}>
              Create New Payment
            </Button>
          </CardFooter>
        </Card>
        <DialogContent>
          <PaymentForm />
        </DialogContent>
      </Dialog>
    </>
  );
}

//08064373754

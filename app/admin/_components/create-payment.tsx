import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CreatePayment() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Your Orders</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
         Easily create payment link for anyone to pay you.
         Track all transactions for every link created.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Create New Payment</Button>
      </CardFooter>
    </Card>
  )
}

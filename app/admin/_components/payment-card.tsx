import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MoreVertical } from "lucide-react";

export const PaymentCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>
          <div className="flex w-full items-center justify-between">
            <p>
            Sug Dues
            </p>
            <MoreVertical className="text-gray-500 cursor-pointer"/>
          </div>
        </CardDescription>
        <CardTitle className="text-4xl">N3,500</CardTitle>
      </CardHeader>
      {/* <CardContent>
        <div className="text-xs text-muted-foreground">+25% from last week</div>
      </CardContent> */}
      <CardFooter className="">
        <div>
          <Button className=""  size="sm">View Transaction</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

import {
  Home,
  PanelLeft,
  Search,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { signOut } from "@/auth";
import { sessionUser } from "../types";

export const Header = ({user}: sessionUser) => {
  const signout = async () => {
    "use server";
    await signOut();
  };


  return (
    <header className="sticky top-0 z-30 mx-3 rounded-lg border-1 bg-white h-14 gap-4 border-b px-4 py-3 sm:static sm:h-auto sm:border-0  sm:px-6 flex items-center justify-between">
      <div>
        JustDues
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-x-3">
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src="/placeholder-user.jpg"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden"
            />
          </Button>
          <p className="text-sm font-semibold">{user.name}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign out</Button>
          </form>
          <form action={async () => {
              "use server";
              await signOut();
            }}>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

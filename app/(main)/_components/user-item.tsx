"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight, LogOut } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const UserItem = () => {
  const { user } = useUser();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="w-full flex items-center text-sm p-3 hover:bg-primary/5"
          >
            <div className="flex items-center gap-x-2 max-w-[150px]">
              <Avatar className="size-8">
                <AvatarImage src={user?.imageUrl}></AvatarImage>
              </Avatar>
              <span className="w-full text-start font-medium truncate">
                {user?.fullName}&apos;s Notion
              </span>
            </div>

            <ChevronsLeftRight className="rotate-90 text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64"
          align="start"
          alignOffset={11}
          forceMount
        >
          <div className="felx flex-col space-y-4 p-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>
            <div className="flex items-center gap-x-2">
              <div className="rounded-md bg-secondary p-1">
                <Avatar className="size-8">
                  <AvatarImage src={user?.imageUrl}></AvatarImage>
                </Avatar>
              </div>
              <div className="space-y-1">
                <p className="text-sm line-clamp-1">
                  {user?.fullName}&apos;s notion
                </p>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className="w-full cursor-pointer text-muted-foreground"
          >
            <SignOutButton>
              <div className="flex items-center">
                <span>Logout</span>
                <LogOut className="size-4" />
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

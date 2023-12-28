"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronsLeftRight } from "lucide-react";
import React from "react";

const UserItem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-sm p-3 w-full">
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="w-5 h-5">
              <AvatarImage src={user?.imageUrl} alt="user profile" />
            </Avatar>
            <span>{user?.fullName}&apos;s Notion</span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="bg-secondary rounded-md p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} alt="user image" />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.fullName}&apos;s Notion
              </p>
            </div>
          </div>
        </div>
        <div className="px-2">
          <SignOutButton>Log Out</SignOutButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;

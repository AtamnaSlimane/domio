"use client";
import { Loader2, LogOut, Settings, UserRoundPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import { useLogout, useUser } from "@/hooks/use-auth";
import { useEffect } from "react";

const UserItem = () => {
  const pathname = usePathname();

  const { data, isLoading } = useUser();

  const { setOpen } = useSidebar();

  const logoutMutation = useLogout();

  useEffect(() => {
    if (!isLoading) {
      setOpen(true);
    }
  }, [isLoading]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Item variant="outline">
      <ItemMedia>
        <Avatar>
          <AvatarImage
            alt="Avatar"
            src={data?.avatar_url ? data.avatar_url : "/avatar.png"}
          />
          <AvatarFallback>{data?.name}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{data?.name}</ItemTitle>
        <ItemDescription>{data?.email}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} size={"icon-lg"}>
              <Settings className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 flex flex-col gap-2 border-border -translate-x-11">
            {pathname === "/profile" ? (
              <Button
                size={"lg"}
                className="w-full"
                variant={"default"}
                disabled
              >
                <UserRoundPen className="w-5 h-5" />
                Profile
              </Button>
            ) : (
              <Button
                asChild
                size={"lg"}
                className="w-full"
                variant={"outline"}
              >
                <Link href="/profile">
                  <UserRoundPen className="w-5 h-5" />
                  Profile
                </Link>
              </Button>
            )}
            <Button
              size={"lg"}
              className="w-full"
              variant={"destructive"}
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  Logout
                </>
              )}
            </Button>
          </PopoverContent>
        </Popover>
      </ItemActions>
    </Item>
  );
};

export default UserItem;

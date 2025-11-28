"use client";
import Link from "next/link";
import Logo from "./Navbar/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  CirclePlus,
  GalleryVertical,
  Heart,
  Loader2,
  LogOut,
  Settings,
  Sparkle,
  TicketCheck,
  UserRoundPen,
} from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@/hooks/use-auth";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { usePathname } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AppSidebar = () => {
  const { data, isLoading } = useUser();
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await axios.post("/logout");
      return response.data;
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Logout failed");
    },
    onSuccess: () => {
      Cookies.remove("token");
      queryClient.setQueryData(["user"], null);
      setOpen(false);
      toast.success("Logout successful");
      router.push("/");
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    if (!isLoading) {
      setOpen(true);
    }
  }, [isLoading]);
  const sidebarItems = [
    {
      label: "Explore",
      href: "/explore",
      icon: Sparkle,
    },
    {
      label: "My Listings",
      href: "/my-listings",
      icon: GalleryVertical,
    },
    {
      label: "My Favorites",
      href: "/my-favorites",
      icon: Heart,
    },
    {
      label: "My Bookings",
      href: "/my-bookings",
      icon: TicketCheck,
    },
    {
      label: "Add Listing",
      href: "/add-listing",
      icon: CirclePlus,
    },
  ] as const;
  return (
    <Sidebar className="border-none">
      <SidebarHeader className="pt-10">
        <div className="flex items-center justify-between w-full px-4">
          <Logo freezed />
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pt-2">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-5">
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
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

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

const AppSidebar = () => {
  const { data, isLoading } = useUser();
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
      <SidebarHeader className="flex items-center justify-center pointer-events-none pt-6">
        <Logo />
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
      <SidebarFooter>
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
            <Button asChild variant={"ghost"} size={"icon-lg"}>
              <Link href="/profile">
                <UserRoundPen className="w-5 h-5" />
              </Link>
            </Button>
          </ItemActions>
        </Item>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

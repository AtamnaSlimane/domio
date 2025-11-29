"use client";
import Link from "next/link";
import Logo from "../Navbar/Logo";
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
} from "../ui/sidebar";
import {
  CirclePlus,
  GalleryVertical,
  Heart,
  Sparkle,
  TicketCheck,
} from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import UserItem from "./UserItem";

const AppSidebar = () => {
  const pathname = usePathname();
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
                  <SidebarMenuButton
                    className={cn(
                      pathname === item.href &&
                        "bg-primary text-primary-foreground"
                    )}
                    asChild
                  >
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
        <UserItem />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

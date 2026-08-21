"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": { title: "Dashboard", subtitle: "Overview & analytics" },
  "/admin/employees": { title: "Employees", subtitle: "Employee of the Month" },
  "/admin/birthdays": { title: "Birthdays", subtitle: "Birthday Greetings" },
  "/admin/announcements": { title: "Announcements", subtitle: "Company Announcements" },
  "/admin/events": { title: "Events", subtitle: "Upcoming Events" },
  "/admin/news": { title: "News", subtitle: "Industry News" },
  "/admin/thoughts": { title: "Thoughts", subtitle: "Thought of the Day" },
  "/admin/participation": { title: "Participation", subtitle: "Employee Participation" },
  "/admin/customers": { title: "Customers", subtitle: "New Customers" },
  "/admin/settings": { title: "Settings", subtitle: "Portal Settings" },
  "/admin/zoho": { title: "Zoho Sync", subtitle: "Zoho Integration" },
};

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const pathname = usePathname();

  const matchedKey = Object.keys(PAGE_TITLES).find((key) => pathname.startsWith(key));
  const pageInfo = matchedKey ? PAGE_TITLES[matchedKey] : { title: "Centroxy", subtitle: "Joy Portal" };

  return (
    <header className="border-stroke shadow-1 dark:border-stroke-dark dark:bg-gray-dark sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 py-5 md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="dark:border-stroke-dark rounded-lg border px-1.5 py-1 lg:hidden dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A]"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="2xsm:ml-4 ml-2 max-[430px]:hidden">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        <h1 className="text-heading-5 text-dark mb-0.5 font-bold dark:text-white">
          {pageInfo.title}
        </h1>
        <p className="font-medium">{pageInfo.subtitle}</p>
      </div>

      <div className="2xsm:gap-4 flex flex-1 items-center justify-end gap-2">
        <div className="relative w-full max-w-75">
          <input
            type="search"
            placeholder="Search"
            className="bg-gray-2 focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary flex w-full items-center gap-3.5 rounded-full border py-3 pr-5 pl-13.25 transition-colors outline-none"
          />

          <SearchIcon className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 max-[1015px]:size-5" />
        </div>

        <ThemeToggleSwitch />

        <Notification />

        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}

import type { SVGProps } from "react";
import * as Icons from "../icons";

type NavItem = {
  title: string;
  url: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
  items: NavItem[];
};

type NavSection = {
  label: string;
  items: NavItem[];
};

export const NAV_DATA: NavSection[] = [
  {
    label: "CENTROXY",
    items: [
      {
        title: "Overview",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Display Screen",
        url: "/",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Banners",
        url: "/admin/banners",
        icon: Icons.ImageIcon,
        items: [],
      },
    ],
  },
];

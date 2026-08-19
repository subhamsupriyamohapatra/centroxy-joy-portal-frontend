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
        url: "/display",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Modules",
        url: "/admin/modules",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Settings",
        url: "/pages/settings",
        icon: Icons.Table,
        items: [],
      },
    ],
  },
];

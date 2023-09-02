"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { TypographyH3 } from "./ui/typography";

const teams = [
  { id: 1, name: "My lists", href: "#", initial: "ML", current: true },
  { id: 2, name: "Discover", href: "#", initial: "DSCVR", current: false },
  { id: 3, name: "Groups", href: "#", initial: "GRPS", current: false },
  {
    id: 3,
    name: "Feed",
    href: "#",
    initial: "FEED",
    current: false,
  },
];

const navColors = (theme: string, active: boolean) => {
  let bgColor, textColor, hoverColor, hoverBg;

  if (active) {
    if (theme === "dark") {
      bgColor = "bg-slate-700";
      textColor = "text-white";
    } else {
      bgColor = "bg-white";
      textColor = "text-slate-900";
    }
  } else {
    if (theme === "dark") {
      textColor = "text-slate-200";
      hoverColor = "hover:text-white";
      hoverBg = "hover:bg-slate-700";
    } else {
      textColor = "text-slate-900";
      hoverColor = "hover:text-slate-900";
      hoverBg = "hover:bg-slate-100";
    }
  }

  return {
    bgColor,
    textColor,
    hoverColor,
    hoverBg,
  };
};

export const SidebarNav = () => {
  const { resolvedTheme: theme } = useTheme();
  return (
    <nav className="p-14">
      <Link href="/">
        <TypographyH3>simbi</TypographyH3>
      </Link>
      <ul role="list" className="-mx-2 space-y-1 mt-20">
        {teams.map((team) => (
          <li key={team.name}>
            <a
              href={team.href}
              className={cn(
                team.current
                  ? theme == "dark"
                    ? "bg-slate-700"
                    : "bg-slate-100"
                  : theme == "dark"
                  ? "hover:bg-slate-800"
                  : "hover:bg-slate-100",
                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
              )}
            >
              <Badge
                className={cn(
                  "p-1 border rounded-lg ",
                  team.current && "border-slate-500"
                )}
                variant={team.current ? "secondary" : "outline"}
              >
                {team.initial}
              </Badge>
              <span className="truncate">{team.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

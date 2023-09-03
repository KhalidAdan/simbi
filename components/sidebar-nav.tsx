"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { TypographyH3 } from "./ui/typography";

type NavType = {
  id: number;
  label: string;
  href: string;
  initial: string;
};

const navLinks: NavType[] = [
  { id: 1, label: "My lists", href: "/lists", initial: "ML" },
  {
    id: 2,
    label: "Discover",
    href: "/discover",
    initial: "DSCVR",
  },
  { id: 3, label: "Groups", href: "/groups", initial: "GRPS" },
  {
    id: 3,
    label: "Feed",
    href: "/feed",
    initial: "FEED",
  },
];

const NavLink: React.FC<NavType> = ({ href, label, initial }) => {
  const { resolvedTheme: theme } = useTheme();
  const pathname = usePathname();
  const isActive = pathname.includes(href);
  return (
    <li>
      <a
        href={href}
        className={cn(
          isActive
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
            isActive && "border-slate-500"
          )}
          variant={isActive ? "secondary" : "outline"}
        >
          {initial}
        </Badge>
        <span className="truncate">{label}</span>
      </a>
    </li>
  );
};

export const SidebarNav = () => {
  return (
    <nav className="p-14">
      <Link href="/">
        <TypographyH3>simbi</TypographyH3>
      </Link>
      <ul role="list" className="-mx-2 space-y-1 mt-20">
        {navLinks.map((team, i) => (
          <NavLink key={i} {...team} />
        ))}
      </ul>
    </nav>
  );
};

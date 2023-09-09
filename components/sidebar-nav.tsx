"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { Icons } from "./ui/icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { TypographyH3 } from "./ui/typography";

type NavType = {
  id: number;
  label: string;
  href: string;
  initial: string;
};

const navLinks: NavType[] = [
  { id: 1, label: "My lists", href: "/lists", initial: "ML" },
  // {
  //   id: 2,
  //   label: "Discover (soon)",
  //   href: "/discover",
  //   initial: "DSCVR",
  // },
  // { id: 3, label: "Groups (soon)", href: "/groups", initial: "GRPS" },
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
      <Link
        href={href}
        className={
          "relative transition flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold max-w-full uppercase"
        }
      >
        <Badge
          className={cn("p-1 border rounded-lg")}
          variant={isActive ? "secondary" : "outline"}
        >
          {initial}
        </Badge>
        {isActive && (
          <motion.span
            layoutId="nav-bubble"
            className={cn(
              theme === "dark" ? "bg-white/5" : "bg-white/5",
              "absolute inset-0 z-10 mix-blend-difference rounded-lg"
            )}
            transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
          />
        )}
        <span className="truncate">{label}</span>
      </Link>
    </li>
  );
};

export const SidebarNav = () => {
  return (
    <motion.aside
      layoutId="sidebar"
      initial={{ opacity: 0.0001 }}
      animate={{ opacity: 1 }}
    >
      <nav className="p-14">
        <Link href="/">
          <TypographyH3>simbi</TypographyH3>
        </Link>
        <motion.ul role="list" className="-mx-2 space-y-1 mt-20">
          {navLinks.map((link, i) => (
            <NavLink key={i} {...link} />
          ))}
        </motion.ul>
      </nav>
    </motion.aside>
  );
};

export const SidebarSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Icons.hamburger className="h-8 w-8 z-10" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <TypographyH3>simbi</TypographyH3>
          </SheetTitle>
        </SheetHeader>
        <SidebarNav />
      </SheetContent>
    </Sheet>
  );
};

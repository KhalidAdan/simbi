import { Features } from "@/components/marketing/features";
import Footer from "@/components/marketing/footer";
import { Jumbotron } from "@/components/marketing/jumbotron";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="m-10 space-y-10">
      <nav className="flex justify-end">
        <div className="flex items-center gap-x-4">
          <ModeToggle />
          <Link
            href={"/lists"}
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Join the crew
          </Link>
        </div>
      </nav>
      <Jumbotron />
      <Features />
      <Footer />
    </main>
  );
}

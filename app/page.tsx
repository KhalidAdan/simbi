import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="m-10">
      <nav className="flex justify-between">
        <div></div>
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
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Badge variant="secondary">Follow along on Twitter</Badge>
          <h1 className="font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to Simbi: The New Way to Crowdfund Your Life!
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Your dreams, projects, and needs are not a solo venture. With Simbi,
            you&apos;re never alone in achieving your goals.
          </p>
        </div>
      </section>
    </main>
  );
}

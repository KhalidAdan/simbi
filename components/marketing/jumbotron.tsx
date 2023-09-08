import { Badge } from "../ui/badge";

export const Jumbotron = () => {
  return (
    <section
      id="jumbotron"
      className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32"
    >
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Badge variant="secondary" className="uppercase">
          Pre-alpha
        </Badge>
        <h1 className="font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to Simbi: The New Way to Crowdfund Your Life!
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Your dreams, projects, and needs are not a solo venture. With Simbi,
          you&apos;re never alone in achieving your goals.
        </p>
      </div>
    </section>
  );
};

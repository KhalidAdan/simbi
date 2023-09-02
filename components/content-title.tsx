import { ModeToggle } from "./ui/theme-toggle";
import { TypographyTitle } from "./ui/typography";

export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between">
      <TypographyTitle>{children}</TypographyTitle>
      <ModeToggle />
    </div>
  );
};

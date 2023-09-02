import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Icons } from "../ui/icons";
import {
  TypographyH3,
  TypographyLead,
  TypographyMuted,
} from "../ui/typography";

const items = [
  {
    name: "One time list",
    description: "Once it's gone it's gone. Make a one time list.",
    href: "/lists",
    icon: Icons.megaPhone,
  },
  {
    name: "Recurring list",
    description:
      "Groceries? Rent? Living expenses? Your cat's catnip habit? Make a recurring list!",
    href: "#",
    icon: Icons.calendar,
  },
  {
    name: "Template Lists",
    description:
      "Save time by using one of our pre-built templates for things like groceries.",
    href: "#",
    icon: Icons.media,
  },
];

export default function ListEmptyState() {
  return (
    <div>
      <div className="space-y-2">
        <TypographyH3>Hmm, nothing here</TypographyH3>
        <TypographyLead>
          Get started by selecting a set of common lists or create your own.
        </TypographyLead>
      </div>
      <ul role="list" className="mt-8">
        {items.map((item, itemIdx) => (
          <li key={itemIdx}>
            <Card className="mb-3">
              <CardContent className="group relative flex items-center md:items-start space-x-3 py-4">
                <div className="flex-shrink-0">
                  <Badge variant="outline" className="rounded-lg py-2 px-3">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </Badge>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium ">
                    <a href={item.href}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {item.name}
                    </a>
                  </div>
                  <TypographyMuted>{item.description}</TypographyMuted>
                </div>
                <div className="flex-shrink-0 self-center">
                  <Icons.arrowRight
                    className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

import {
  TypographyH2,
  TypographyLead,
  TypographyMuted,
} from "../ui/typography";

export const Features = () => {
  return (
    <section
      id="features"
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <TypographyH2>Features</TypographyH2>
        <TypographyLead>
          Simbi makes it so you can crowdfund your life. Whether you&apos;re a
          creator, a business, or just a person with a dream, Simbi is the place
          to make it happen.
        </TypographyLead>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Need Inspo for a gift or event?</h3>
              <TypographyMuted>
                Simbi&apos;s got you covered. Browse our marketplace for unique
                gifts and experiences.
              </TypographyMuted>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Want to support a local business?</h3>
              <TypographyMuted>
                Create a campaign to help your favorite local business get their
                name out there!
              </TypographyMuted>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Hard to shop for?</h3>
              <TypographyMuted>
                Create a wishlist and share it with your friends and family.
              </TypographyMuted>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">
                Feel like you got the perfect desk setup?
              </h3>
              <TypographyMuted>
                Share it with the world and get paid for it with your affiliate
                links!
              </TypographyMuted>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">
                Want to help a friend with their project?
              </h3>
              <TypographyMuted>
                Create a campaign to help your friend get their project off the
                ground! Recurring lists are great for paying the rent!
              </TypographyMuted>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Groups</h3>
              <TypographyMuted>
                It aint no fun if the homies can&apos;t get none. Create a group
                and crowdfund together!
              </TypographyMuted>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

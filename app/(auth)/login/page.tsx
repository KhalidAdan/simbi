import { Input } from "@/components/ui/input";
import { TypographyH2 } from "@/components/ui/typography";
import { UserAuthForm } from "@/components/user-auth-form";
import { checkInviteCode, isValidUUID } from "@/lib/server.utils";

const InvalidInviteCode = () => (
  <TypographyH2>
    Sorry, this invite code is invalid. Please try again.
  </TypographyH2>
);

const InviteOnly = () => (
  <>
    <TypographyH2>
      Simbi is invite only, if you&apos;d like to join the waitlist, sign up
      below!
    </TypographyH2>
    <div className="my-4"></div>
    <Input />
  </>
);

const Login = () => <UserAuthForm state="login" />;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { invite_code } = searchParams;
  const isValidInviteCode = await isValidUUID(invite_code as string);
  const inviteCodeExists = isValidInviteCode
    ? await checkInviteCode(invite_code as string)
    : false;

  let component;
  if (isValidInviteCode && inviteCodeExists) {
    component = <Login />;
  } else if (isValidInviteCode && !inviteCodeExists) {
    component = <InviteOnly />;
  } else {
    component = <InvalidInviteCode />;
  }

  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col">{component}</div>
    </div>
  );
}

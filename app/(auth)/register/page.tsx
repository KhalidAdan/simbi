import { Input } from "@/components/ui/input";
import { TypographyH2 } from "@/components/ui/typography";
import { UserAuthForm } from "@/components/user-auth-form";
import { checkInviteCode, isValidUUID } from "@/lib/server.utils";
import { NextSearchParams } from "@/lib/types";

async function validateInviteCode(
  invite_code: string | string[] | undefined
): Promise<boolean> {
  if (!invite_code || typeof invite_code !== "string") return false;

  const isValid = isValidUUID(invite_code);
  if (!isValid) return false;

  const inviteCodeExists = await checkInviteCode(invite_code);
  if (!inviteCodeExists) return false;

  return true;
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: NextSearchParams;
}) {
  const { invite_code } = searchParams;
  const isValidInviteCode = await validateInviteCode(invite_code);

  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col">
        {isValidInviteCode ? <Register /> : <InviteOnly />}
      </div>
    </div>
  );
}

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

const Register = () => <UserAuthForm state="register" />;

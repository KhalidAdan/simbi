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

export default async function LoginPage({
  searchParams,
}: {
  searchParams: NextSearchParams;
}) {
  const { invite_code } = searchParams;
  const isValidInviteCode = await validateInviteCode(invite_code);
  //localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Flists&invite_code=33a43716-26fa-4d33-8bf2-2deb421f5e01

  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col">
        {isValidInviteCode ? <Login /> : <Login />}
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

const Login = () => <UserAuthForm state="login" />;

import { UserAuthForm } from "@/components/user-auth-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col">
        <UserAuthForm state="login" />
        <p className="leading-7 [&:not(:first-child)]:mt-6 w-2/3 text-center">
          <Link
            href="/register"
            className="hover:text-brand underline-offset-4"
          >
            Don&apos;t have an account?{" "}
            <span className="underline">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

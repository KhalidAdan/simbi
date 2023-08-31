import { UserAuthForm } from "@/components/user-auth-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col">
        <UserAuthForm />
        <p className="leading-7 [&:not(:first-child)]:mt-6 w-2/3 text-center">
          {" "}
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="hover:text-brand underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

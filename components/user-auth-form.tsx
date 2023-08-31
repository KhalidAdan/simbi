"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function UserAuthForm({ state }: { state: "login" | "register" }) {
  const { data: session } = useSession();
  if (session)
    // redirect to home if already signed in
    redirect("/");
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex justify-center mb-4">
          {state === "login" ? "Welcome Back" : "Create Account"}
        </CardTitle>
        <CardDescription className="flex justify-center mb-4">
          Choose an authentication provider below that you have an account with
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault(); // next auth errors if this is removed???
                  signIn("google", {
                    callbackUrl: "/",
                    redirect: true,
                  });
                }}
              >
                Google
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

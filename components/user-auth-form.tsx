"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

export function UserAuthForm({
  state,
  inviteCode,
}: {
  state: "login" | "register";
  inviteCode?: string;
}) {
  const callbackUrl = inviteCode
    ? "/lists?invite_code=" + inviteCode
    : "/lists";
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
                  e.preventDefault();
                  signIn("google", {
                    callbackUrl,
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

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

export function UserAuthForm() {
  const { data: session } = useSession();
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex justify-center mb-4">
          Create an account
        </CardTitle>
        <CardDescription className="flex justify-center mb-4">
          Choose an authentication privder below that you have an account with
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Button onClick={() => signIn()}>GitHub</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

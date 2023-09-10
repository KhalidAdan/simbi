import SimbiAdapter from "@/services/simbi-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: SimbiAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          include_granted_scopes: "true",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 5 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
};

function getAuthOptionsWithInvite(req: Request): AuthOptions {
  let inviteCode: string | null = null;

  console.log(req.url);

  // Extract invite code from req.url (you might need more advanced parsing if it's complex)
  const urlParts = req.url?.split("?");
  if (urlParts && urlParts[1]) {
    const params = new URLSearchParams(urlParts[1]);
    inviteCode = params.get("inviteCode");
  }

  // Modify your authOptions or events based on the inviteCode if it exists
  const updatedEvents = { ...authOptions.events };
  if (inviteCode) {
    updatedEvents.signIn = async ({ user, isNewUser }) => {
      // Utilize the inviteCode here
      console.log("inviteCode is here!", inviteCode);
    };
  }

  return {
    ...authOptions,
    events: updatedEvents,
  };
}

const handler = NextAuth(authOptions);

export async function GET(req: Request, res: Response) {
  const authOptionsWithInvite = getAuthOptionsWithInvite(req);
  return handler(req, res, authOptionsWithInvite);
}

export function POST(req: Request, res: Response) {
  const authOptionsWithInvite = getAuthOptionsWithInvite(req);
  return handler(req, res, authOptionsWithInvite);
}

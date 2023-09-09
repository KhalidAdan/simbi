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
  events: {
    signIn: ({ user, isNewUser }) => {
      // get the request URL here and check for an invite code!!
      return;
    },
  },
};

// create a regular handler for the auth route
// get the url from req.url
// if it has an invite code use the signIn event to add the user to the list
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

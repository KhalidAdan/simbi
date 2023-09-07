import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

const protectedRoutes = [
  "/lists",
  "/discover",
  "/profile",
  "/settings",
  "/groups",
  "/feed",
];

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      for (const route of protectedRoutes) {
        if (req.nextUrl.pathname === route && token === null) {
          return false;
        }
      }
      return true;
    },
  },
});

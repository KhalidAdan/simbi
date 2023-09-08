import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to selectively apply

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const url = new URL(req.url);
      if (
        url.pathname !== "/" &&
        url.pathname !== "/login" &&
        url.pathname !== "/register" &&
        url.pathname !== "/terms" &&
        url.pathname !== "/privacy" &&
        token === null
      ) {
        return false;
      }
      return true;
    },
  },
});

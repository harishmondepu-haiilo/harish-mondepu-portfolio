import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // Protect all admin routes EXCEPT the login page and API auth routes
  matcher: ["/admin/((?!login).*)"],
};

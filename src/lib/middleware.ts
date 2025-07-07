import { auth } from "@/lib/auth";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isProtected =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/graph");

  if (isProtected && !isAuth) {
    return Response.redirect(new URL("/login", req.url));
  }
});

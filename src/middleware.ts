export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/contack/:path*", "/addContact/:path*"],
};

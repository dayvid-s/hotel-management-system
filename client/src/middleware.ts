import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  const signInUrl = new URL("/", request.url);
  const adminDashboardUrl = new URL("/admin/dashboard", request.url);
  const dashboardOfGuestUrl = new URL("/guest/dashboard", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    signInUrl.searchParams.set("expired", "1");
    return NextResponse.redirect(signInUrl);
  }

  let user;
  try {
    user = JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error("Token inválido:", error);
    return NextResponse.redirect(signInUrl);
  }

  const isAdminOrReceptionist = user.role === "admin" || user.role === "receptionist";
  const isGuest = user.role === "guest";


  if (isAdminOrReceptionist && (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/loginAdmin")) {
    return NextResponse.redirect(adminDashboardUrl);
  }

  if (isGuest && (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/loginGuest")) {
    return NextResponse.redirect(dashboardOfGuestUrl);
  }


  const adminRoutes = ["/admin", "/admin/dashboard",];

  if (adminRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!isAdminOrReceptionist) {
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/guest/:path*",
    "/admin/:path*",
  ],
};
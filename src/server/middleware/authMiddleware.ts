import { auth } from "#/lib/auth";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await getRequestHeaders(),
  });

  if (!session?.user) {
    throw redirect({ to: "/login" });
  }

  return next({
    context: {
      user: session.user,
    },
  });
});

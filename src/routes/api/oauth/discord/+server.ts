import { dev } from "$app/environment";
import { discordAuth } from "$lib/server/lucia/client";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies, locals }) => {

  const session = await locals.auth.validate();

  if (session) return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });

  const [url, state] = await discordAuth.getAuthorizationUrl();

  cookies.set("state", state, {
    path: "/",
    httpOnly: true,
    secure: !dev,
    maxAge: 60 * 60,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
};

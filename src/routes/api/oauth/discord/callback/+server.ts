import type { RequestHandler } from "@sveltejs/kit";

import { OAuthRequestError } from "@lucia-auth/oauth";

import { auth, discordAuth } from "$lib/server/lucia/client";

export const GET: RequestHandler = async ({ url, cookies, locals }) => {

  const state = cookies.get("state");

  const oauthState = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!state || !oauthState || state !== oauthState || !code) return new Response(null, { status: 400 });

  try {

    const { getExistingUser, createUser, discordUser } = await discordAuth.validateCallback(code);

    const getUser = async () => {

      const existingUser = await getExistingUser();

      if (existingUser) return existingUser;

      const user = await createUser({
        attributes: {
          username: discordUser.username
        }
      });

      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });

    locals.auth.setSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (error) {
    console.error(error);
    if (error instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }
};

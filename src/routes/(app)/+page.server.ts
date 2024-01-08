import { fail, type Actions } from "@sveltejs/kit";

import { auth } from "$lib/server/lucia/client";

export const actions: Actions = {
  logout: async ({ locals }) => {

    const session = await locals.auth.validate();

    if (!session) return fail(401);

    await auth.invalidateSession(session);

    locals.auth.setSession(null);

    throw new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }
};

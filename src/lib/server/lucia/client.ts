import { dev } from '$app/environment';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } from '$env/static/private';

import { pg } from "@lucia-auth/adapter-postgresql";
import { discord } from '@lucia-auth/oauth/providers';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

import { connection } from '../drizzle/client';

export const auth = lucia({
  adapter: pg(connection, {
    user: 'auth_user',
    session: 'user_session',
    key: 'user_key',
  }),
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),

  getUserAttributes: (data) => {
    return {
      username: data.username,
    }
  },
});

export const discordAuth = discord(auth, {
  clientId: DISCORD_CLIENT_ID,
  clientSecret: DISCORD_CLIENT_SECRET,
  redirectUri: dev ? 'http://localhost:5173/api/oauth/discord/callback' : DISCORD_REDIRECT_URI,
  scope: ['identify', 'email'],
});

export type Auth = typeof auth;

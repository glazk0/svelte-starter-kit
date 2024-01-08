// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	/// <reference types="lucia" />
	declare global {
		namespace Lucia {
			type Auth = import("$lib/server/lucia/client").Auth;
			type DatabaseUserAttributes = {
				username: string;
			};
			type DatabaseSessionAttributes = object;
		}
	}
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };

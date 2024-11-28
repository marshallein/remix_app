import type { LoaderFunction } from '@remix-run/node';
import { logout } from '~/modules/server/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
   return await logout(request);
};

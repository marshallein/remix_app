import {
   json,
   Links,
   Meta,
   Outlet,
   Scripts,
   useLoaderData,
} from '@remix-run/react';
import type {
   ActionFunctionArgs,
   LinksFunction,
   LoaderFunctionArgs,
} from '@remix-run/node';

import './tailwind.css';
import 'swiper/css';
import 'swiper/css/effect-fade';

import HeaderComponent from './components/Layout/Header';
import FooterComponent from './components/Layout/Footer';
import { getUser, logout } from './modules/server/auth.server';
import { getUserCartInfo } from './modules/server/user.server';

export const links: LinksFunction = () => [
   {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
   },
   {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
   },
   {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
   },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
   const user = await getUser(request);
   const cartItemCount = await getUserCartInfo(String(user?.id || 0));

   return json({
      user,
      cartItemCount: cartItemCount?.CartItems.length,
   });
};

export const action = async ({ request }: ActionFunctionArgs) => {
   await logout(request);
};

export function Layout({ children }: { children: React.ReactNode }) {
   const data = useLoaderData<typeof loader>();

   return (
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
         </head>
         <body className="bg-white">
            <HeaderComponent
               user={data?.user}
               cartItemCount={data?.cartItemCount}
            />
            {children}
            <FooterComponent />
            <Scripts />
         </body>
      </html>
   );
}

export default function App() {
   return <Outlet />;
}

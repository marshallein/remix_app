import {
   json,
   Links,
   Meta,
   Outlet,
   Scripts,
   useLoaderData,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';

// import "./tailwind.css";
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/effect-fade';

import HeaderComponent from './components/Layout/Header';
import FooterComponent from './components/Layout/Footer';
import { useEffect } from 'react';
import { getUser } from './modules/server/auth.server';

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

   return json({ user });
};

export function Layout({ children }: { children: React.ReactNode }) {
   const data = useLoaderData<typeof loader>();

   useEffect(() => {
      // Dynamically import Bootstrap's JS only on the clients
      import(
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         'bootstrap/dist/js/bootstrap.bundle'
      );
   }, []);

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
         <body>
            <HeaderComponent user={data?.user} />
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

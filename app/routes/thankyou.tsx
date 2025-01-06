import { json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getUser } from '~/modules/server/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
   const user = await getUser(request);
   if (!user) {
      return redirect('/login');
   }

   return json({ user });
};

export default function ThankYouPage() {
   const data = useLoaderData<typeof loader>();

   return (
      <main>
         <div className="">
            <div className="">✔</div>
            <h1>Thank you!</h1>
            <p>
               Your Order have been created, More information will be announced
               later.
               <br />
               Thank you {`${data.user.name}`} for your order. We will contact
               you soon.
            </p>
            <Link className="" to={'/'}>
               Back to Home
            </Link>
         </div>
      </main>
   );
}

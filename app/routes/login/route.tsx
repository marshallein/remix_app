import { useEffect, useState } from 'react';
import FormInput from '~/components/FormInput';
import {
   ActionFunction,
   ActionFunctionArgs,
   json,
   LoaderFunction,
   MetaFunction,
   redirect,
} from '@remix-run/node';
import { getUser, login, register } from '~/modules/server/auth.server';
import { loginSchema, registerSchema } from '~/modules/server/user.server';
import { useActionData } from '@remix-run/react';

export const meta: MetaFunction = () => {
   return [{ title: 'Login/Register' }];
};

export const loader: LoaderFunction = async ({ request }) => {
   // If there's already a user in the session, redirect to the home page
   return (await getUser(request)) ? redirect('/') : null;
};

export const action: ActionFunction = async ({
   request,
}: ActionFunctionArgs) => {
   const form = await request.formData();

   const email = form.get('email') as string;
   const password = form.get('password') as string;
   const action = form.get('_action') as string;
   const userName = form.get('userName') as string;
   const name = form.get('name') as string;

   console.log("action", email, password, action, userName, name);


   const result =
      action === 'login'
         ? loginSchema.safeParse({ email, password })
         : registerSchema.safeParse({ email, password, userName, name });

   if (!result.success) {
      const errors = result.error.flatten();
      return json({ errors, action: action }, { status: 400 });
   }

   switch (action) {
      case 'login': {
         return await login({ email, password });
      }
      case 'register': {
         return await register({ email, password, userName, name });
      }
      default:
         return json({ error: `Invalid Form Data` }, { status: 400 });
   }
};

export default function LoginPage() {
   const actionData = useActionData<typeof action>();
   const [form, setForm] = useState<'login' | 'register'>('login');
   const [formData, setFormData] = useState({
      email: '',
      password: '',
      userName: '',
      name: '',
   });


   console.log(actionData);


   useEffect(() => {
      if (actionData && actionData?.action) {
         setForm(actionData?.action)
      }
   }, [actionData, actionData?.action])

   const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      field: string,
   ) => {
      setFormData((form) => ({ ...form, [field]: event.target.value }));
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-alternative_2 flex items-center justify-center px-4 py-12">
         <div className="w-full max-w-4xl bg-white/90 backdrop-blur rounded shadow-2xl grid md:grid-cols-2 overflow-hidden border border-white/30">
            <div className="relative hidden md:flex flex-col gap-6 p-10 bg-gradient-to-br from-secondary/80 via-primary/80 to-white">
               <div className="absolute inset-0 bg-white/40 opacity-70 mix-blend-overlay pointer-events-none" />
               <div className="relative space-y-4">
                  <p className="text-sm uppercase tracking-[0.4em] text-alternative_2/70 font-semibold">
                     {form === 'login' ? 'Welcome back' : 'Create account'}
                  </p>
                  <h2 className="text-4xl font-bold text-alternative_2 drop-shadow-sm">
                     {form === 'login'
                        ? 'Step back into your dashboard'
                        : 'Start your journey with us'}
                  </h2>
                  <p className="text-alternative_1 leading-relaxed">
                     Seamlessly move between login and registration without leaving
                     the page. Your credentials stay safe and secure.
                  </p>
               </div>
               <div className="relative mt-auto flex items-center gap-3 text-sm text-alternative_2/80">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-alternative_2/30 bg-primary/60 text-alternative_2 font-semibold">
                     {form === 'login' ? 'L' : 'R'}
                  </span>
                  <div>
                     <p className="font-semibold">
                        {form === 'login' ? 'Login mode' : 'Register mode'}
                     </p>
                     <p>Use the toggle to switch whenever you need.</p>
                  </div>
               </div>
            </div>
            <div className="relative p-8 md:p-10 bg-white">
               <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.35em] text-secondary">
                     Account access
                  </p>
                  <h3 className="text-3xl font-semibold text-alternative_2">
                     {form === 'login' ? 'Login' : 'Register'}
                  </h3>
                  <p className="text-sm text-alternative_1">
                     {form === 'login'
                        ? 'Enter your credentials to access your dashboard.'
                        : 'Fill in your details to create a new account.'}
                  </p>
               </div>
               <form method="POST" className="mt-8 grid gap-5">
                  <FormInput
                     htmlFor={'email'}
                     id={'email'}
                     type="text"
                     label={'Email'}
                     value={formData.email}
                     onchange={(e) => handleInputChange(e, 'email')}
                     errors={actionData?.errors?.fieldErrors?.email}
                  />
                  <FormInput
                     htmlFor={'password'}
                     id={'password'}
                     type="password"
                     label={'Password'}
                     value={formData.password}
                     onchange={(e) => handleInputChange(e, 'password')}
                     errors={actionData?.errors?.fieldErrors?.password}
                  />

                  {form == 'register' && (
                     <FormInput
                        htmlFor="userName"
                        id="userName"
                        label="Username"
                        value={formData.userName}
                        onchange={(e) => handleInputChange(e, 'userName')}
                        errors={actionData?.errors?.fieldErrors?.userName}
                     />
                  )}
                  {form == 'register' && (
                     <FormInput
                        htmlFor="name"
                        id="name"
                        label="name"
                        value={formData.name}
                        onchange={(e) => handleInputChange(e, 'name')}
                        errors={actionData?.errors?.fieldErrors?.name}
                     />
                  )}

                  <button
                     type="submit"
                     name="_action"
                     value={form}
                     className="mt-4 inline-flex w-full items-center justify-center rounded bg-alternative_2 px-6 py-3 text-base font-semibold text-primary shadow-lg shadow-alternative_2/40 transition hover:-translate-y-0.5 hover:bg-alternative_2/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60"
                  >
                     {form == 'login' ? 'Login' : 'Register'}
                  </button>
               </form>
               <div className="mt-8 flex items-center justify-between rounded border border-dashed border-alternative_1/30 px-4 py-3 text-sm text-alternative_1">
                  <span>
                     {form == 'login'
                        ? `Don't have an account yet?`
                        : 'Already have an account?'}
                  </span>
                  <button
                     onClick={() => setForm(form == 'login' ? 'register' : 'login')}
                     className="font-semibold text-secondary transition hover:text-alternative_2 focus:outline-none focus-visible:ring focus-visible:ring-secondary/60 rounded px-2 py-1"
                  >
                     {form == 'login' ? 'Switch to Register' : 'Switch to Login'}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

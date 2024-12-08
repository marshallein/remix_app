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
      <div className="container vh-95 d-flex justify-content-center align-items-center">
         <div className="card p-4 shadow" style={{ width: '350px' }}>
            <h3 className="text-center mb-4">
               {form === 'login' ? 'Login' : 'Register'}
            </h3>
            <form method="POST">
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
                  className="btn btn-primary w-100"
               >
                  {form == 'login' ? 'Login' : 'Register'}
               </button>
            </form>
            <button
               onClick={() => setForm(form == 'login' ? 'register' : 'login')}
               className="btn btn-info w-100 mt-2"
            >
               {form == 'login' ? 'Switch to Register' : 'Switch to Login'}
            </button>
         </div>
      </div>
   );
}

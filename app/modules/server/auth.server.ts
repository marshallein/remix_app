import { json, createCookieSessionStorage, redirect } from '@remix-run/node';
import {
   comparePassword,
   createUser,
   getUserByEmail,
   getUserInfoById,
   LoginForm,
   RegisterForm,
} from './user.server';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
   throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
   cookie: {
      name: 'a-login-session-its-what-its',
      secure: process.env.NODE_ENV === 'production',
      secrets: [sessionSecret],
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // seconds, ofc
      httpOnly: true,
   },
});

export async function createUserSession(userId: string, redirectTo: string) {
   const session = await storage.getSession();
   session.set('userId', userId);

   return redirect(redirectTo, {
      headers: {
         'Set-Cookie': await storage.commitSession(session),
      },
   });
}

export async function register(user: RegisterForm) {
   //check to see if the user is exist on the database to preserve the uniqueness of the data
   const exists = await getUserByEmail(user.email);
   if (exists) {
      return json(
         { error: `User already exists with that email` },
         { status: 400 },
      );
   }

   // start to create an user
   const newUser = await createUser(user);

   // this handle if anything is error
   if (!newUser) {
      return json(
         {
            error: `Something went wrong trying to create a new user.`,
            fields: { email: user.email, password: user.password },
         },
         { status: 400 },
      );
   }

   // create new login session for user and redirect to home ("/")
   return createUserSession(String(newUser.id), '/');
}

export async function login({ email, password }: LoginForm) {
   // get user by find the email.
   const user = await getUserByEmail(email);

   //if user is empty ơr false-thy or the password does not match the password in db => return error with status 400
   if (!user || !comparePassword(password, user.password))
      return json({ error: `Incorrect login` }, { status: 400 });

   // redirect to home ("/")
   return createUserSession(String(user.id), '/');
}

export async function requireUserId(
   request: Request,
   redirectTo: string = new URL(request.url).pathname,
) {
   const session = await getUserSession(request);
   const userId = session.get('userId');
   if (!userId || typeof userId !== 'string') {
      const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
      throw redirect(`/login?${searchParams}`);
   }
   return userId;
}

function getUserSession(request: Request) {
   return storage.getSession(request.headers.get('Cookie'));
}

async function getUserId(request: Request) {
   const session = await getUserSession(request);
   const userId = session.get('userId');
   if (!userId || typeof userId !== 'string') return null;
   return userId;
}

export async function getUser(request: Request) {
   const userId = await getUserId(request);
   if (typeof userId !== 'string') {
      return null;
   }

   try {
      return await getUserInfoById(userId);
   } catch {
      throw logout(request);
   }
}

export async function logout(request: Request) {
   const session = await getUserSession(request);
   return redirect('/login', {
      headers: {
         'Set-Cookie': await storage.destroySession(session),
      },
   });
}

import {
   ActionFunctionArgs,
   json,
   LoaderFunctionArgs,
   redirect,
} from '@remix-run/node';
import { Link, useActionData, useLoaderData } from '@remix-run/react';
import { FaCheckCircle } from 'react-icons/fa';
import { getUser } from '~/modules/server/auth.server';
import {
   createFeedback,
   CreateFeedbackPayload,
} from '~/modules/server/feedback.server';
import { useState } from 'react';
import FormInput from '~/components/FormInput';

export const loader = async ({ request }: LoaderFunctionArgs) => {
   const user = await getUser(request);
   if (!user) {
      return redirect('/login');
   }

   return json({ user });
};

export const action = async ({ request }: ActionFunctionArgs) => {
   const user = await getUser(request);
   if (!user) {
      return redirect('/login');
   }

   const formData = await request.formData();
   const comment = formData.get('comment') as string;
   const avatarUrl = formData.get('avatarUrl') as string;

   if (!comment || comment.trim().length === 0) {
      return json(
         { error: 'Comment is required', success: false },
         { status: 400 },
      );
   }

   const payload: CreateFeedbackPayload = {
      customer: user.name,
      avatarUrl: avatarUrl || '/default-avatar.png',
      comment: comment.trim(),
   };

   const result = await createFeedback(payload);

   if (result.ok) {
      return json({ success: true, error: null });
   } else {
      return json(
         { error: 'Failed to submit feedback', success: false },
         { status: 500 },
      );
   }
};

export default function ThankYouPage() {
   const data = useLoaderData<typeof loader>();
   const actionData = useActionData<typeof action>();
   const [feedbackData, setFeedbackData] = useState({
      comment: '',
      avatarUrl: '',
   });

   const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: string,
   ) => {
      const { value } = event.target;
      setFeedbackData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   const isFeedbackSubmitted = actionData?.success === true;

   return (
      <section className="min-h-screen bg-gradient-to-br from-primary/70 via-white to-secondary/40">
         <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-0">
            <div className="rounded border border-white/60 bg-white/85 px-8 py-10 shadow-2xl shadow-primary/30 space-y-6">
               <FaCheckCircle className="mx-auto text-6xl text-secondary" />
               <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.5em] text-secondary">
                     Order confirmed
                  </p>
                  <h1 className="text-4xl font-light text-alternative_2">
                     Thank you, {data.user.name}
                  </h1>
                  <p className="text-sm text-alternative_1 leading-relaxed">
                     Your order has been created successfully. We&apos;ll send a
                     follow-up email with shipping details shortly and reach out if
                     we need anything else.
                  </p>
               </div>
               <div className="rounded border border-alternative_1/20 bg-white/70 px-6 py-4 text-sm text-alternative_2">
                  <p className="font-semibold uppercase tracking-[0.35em] text-secondary">
                     Next steps
                  </p>
                  <p>
                     Keep an eye on your inbox. Our team is preparing your package
                     and will contact you soon about delivery.
                  </p>
               </div>

               {/* Feedback Form */}
               <div className="rounded border border-secondary/30 bg-white/70 px-6 py-6 text-left space-y-4">
                  {!isFeedbackSubmitted ? (
                     <>
                        <div className="text-center space-y-2">
                           <p className="font-semibold uppercase tracking-[0.35em] text-secondary text-xs">
                              Share your experience
                           </p>
                           <p className="text-sm text-alternative_1">
                              We&apos;d love to hear your feedback about your shopping
                              experience!
                           </p>
                        </div>
                        <form method="post" className="space-y-4">
                           <div className="space-y-2">
                              <label
                                 htmlFor="comment"
                                 className="text-xs font-semibold uppercase tracking-[0.3em] text-alternative_2"
                              >
                                 Your Comment *
                              </label>
                              <textarea
                                 id="comment"
                                 name="comment"
                                 rows={4}
                                 value={feedbackData.comment}
                                 onChange={(e) => handleInputChange(e, 'comment')}
                                 className="w-full rounded border border-alternative_1/20 bg-white px-4 py-2 text-sm text-alternative_2 shadow-inner focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
                                 placeholder="Tell us about your experience..."
                                 required
                              />
                           </div>
                           <FormInput
                              htmlFor="avatarUrl"
                              id="avatarUrl"
                              label="Avatar URL (Optional)"
                              type="url"
                              value={feedbackData.avatarUrl}
                              onchange={handleInputChange}
                           />
                           {actionData?.error && (
                              <p className="text-xs text-rose-500">
                                 {actionData.error}
                              </p>
                           )}
                           <button
                              type="submit"
                              disabled={!feedbackData.comment.trim()}
                              className="w-full rounded bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-alternative_2 shadow-lg shadow-secondary/40 transition hover:-translate-y-0.5 hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-secondary"
                           >
                              Submit Feedback
                           </button>
                        </form>
                     </>
                  ) : (
                     <div className="text-center space-y-2 py-4">
                        <p className="text-sm font-semibold text-secondary">
                           ✓ Thank you for your feedback!
                        </p>
                        <p className="text-xs text-alternative_1">
                           Your comment has been saved successfully.
                        </p>
                     </div>
                  )}
               </div>

               <Link
                  className="inline-flex items-center justify-center rounded bg-alternative_2 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-primary shadow-lg shadow-alternative_2/40 transition hover:-translate-y-0.5 hover:bg-alternative_2/90"
                  to={'/'}
               >
                  Back to home
               </Link>
            </div>
         </div>
      </section>
   );
}

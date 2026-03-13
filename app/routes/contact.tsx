import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import {
   FaPhone,
   FaGlobe,
   FaEnvelope,
   FaMapMarker,
   FaCheckCircle,
} from 'react-icons/fa';
import { FaTicket } from 'react-icons/fa6';
import { useState } from 'react';
import {
   createContact,
   CreateContactPayload,
} from '~/modules/server/contact.server';
import { generateCouponCode } from '~/modules/domain';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loader = async ({ request }: LoaderFunctionArgs) => {
   return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
   const formData = await request.formData();
   const name = formData.get('name') as string;
   const email = formData.get('email') as string;
   const message = formData.get('message') as string;

   if (!name || !email || !message) {
      return json(
         {
            error: 'All fields are required',
            success: false,
            couponCode: null,
         },
         { status: 400 },
      );
   }

   if (name.trim().length < 2) {
      return json(
         {
            error: 'Name must be at least 2 characters',
            success: false,
            couponCode: null,
         },
         { status: 400 },
      );
   }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
      return json(
         {
            error: 'Please enter a valid email address',
            success: false,
            couponCode: null,
         },
         { status: 400 },
      );
   }

   if (message.trim().length < 10) {
      return json(
         {
            error: 'Message must be at least 10 characters',
            success: false,
            couponCode: null,
         },
         { status: 400 },
      );
   }

   const payload: CreateContactPayload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
   };

   const result = await createContact(payload);

   if (result.ok) {
      const couponCode = generateCouponCode();
      return json({
         success: true,
         error: null,
         couponCode,
      });
   } else {
      return json(
         {
            error: 'Failed to submit contact form',
            success: false,
            couponCode: null,
         },
         { status: 500 },
      );
   }
};

export default function ContactPage() {
   const actionData = useActionData<typeof action>();
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
   });

   const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: string,
   ) => {
      const { value } = event.target;
      setFormData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   const isFormSubmitted = actionData?.success === true;

   return (
      <section className="min-h-screen bg-gradient-to-b from-primary/70 via-white to-secondary/40">
         <div className="mx-auto max-w-5xl space-y-10 px-4 py-16 sm:px-6 lg:px-0">
            <div className="text-center space-y-3">
               <p className="text-xs uppercase tracking-[0.5em] text-secondary">
                  Contact us
               </p>
               <h2 className="text-4xl font-light text-alternative_2">
                  We&apos;d love to hear from you
               </h2>
               <p className="text-sm text-alternative_1">
                  Leave your information below to receive a 10% voucher and stay
                  up to date with the latest releases.
               </p>
            </div>

            {isFormSubmitted ? (
               <div className="rounded border border-white/70 bg-white/85 p-8 shadow-2xl shadow-primary/30">
                  <div className="mx-auto max-w-2xl space-y-6 text-center">
                     <FaCheckCircle className="mx-auto text-6xl text-secondary" />
                     <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.5em] text-secondary">
                           Thank you for contacting us!
                        </p>
                        <h3 className="text-3xl font-light text-alternative_2">
                           We&apos;ve received your message
                        </h3>
                        <p className="text-sm text-alternative_1 leading-relaxed">
                           Our team will get back to you within 24 hours. We
                           appreciate your interest in our products.
                        </p>
                     </div>

                     {/* Coupon Code Display */}
                     <div className="rounded-lg border-2 border-dashed border-secondary/50 bg-gradient-to-br from-primary/30 to-secondary/20 p-6 shadow-lg">
                        <div className="flex items-center justify-center gap-2 text-secondary mb-3">
                           <FaTicket className="text-2xl" />
                           <p className="text-xs font-semibold uppercase tracking-[0.4em]">
                              Your exclusive coupon
                           </p>
                        </div>
                        <div className="rounded bg-white px-6 py-4 shadow-inner">
                           <p className="text-3xl font-bold tracking-wider text-alternative_2">
                              {actionData?.couponCode}
                           </p>
                        </div>
                        <p className="mt-4 text-xs text-alternative_1">
                           Use this code at checkout to get{' '}
                           <span className="font-semibold text-secondary">
                              10% OFF
                           </span>{' '}
                           your next purchase!
                        </p>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="grid gap-8 rounded border border-white/70 bg-white/85 p-8 shadow-2xl shadow-primary/30 md:grid-cols-2">
                  <form method="post" className="space-y-5">
                     <div className="space-y-2">
                        <label
                           htmlFor="name"
                           className="block text-xs font-semibold uppercase tracking-[0.35em] text-alternative_1"
                        >
                           Your name
                        </label>
                        <input
                           type="text"
                           id="name"
                           name="name"
                           value={formData.name}
                           onChange={(e) => handleInputChange(e, 'name')}
                           className="w-full rounded border border-alternative_1/30 bg-white/80 px-4 py-3 text-sm text-alternative_2 placeholder:text-alternative_1/50 transition focus:border-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40"
                           required
                           placeholder="Nguyen Thi Minh"
                        />
                     </div>
                     <div className="space-y-2">
                        <label
                           htmlFor="email"
                           className="block text-xs font-semibold uppercase tracking-[0.35em] text-alternative_1"
                        >
                           Email address
                        </label>
                        <input
                           type="email"
                           id="email"
                           name="email"
                           value={formData.email}
                           onChange={(e) => handleInputChange(e, 'email')}
                           className="w-full rounded border border-alternative_1/30 bg-white/80 px-4 py-3 text-sm text-alternative_2 placeholder:text-alternative_1/50 transition focus:border-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40"
                           required
                           placeholder="name@example.com"
                        />
                     </div>
                     <div className="space-y-2">
                        <label
                           htmlFor="message"
                           className="block text-xs font-semibold uppercase tracking-[0.35em] text-alternative_1"
                        >
                           Message
                        </label>
                        <textarea
                           id="message"
                           name="message"
                           rows={5}
                           value={formData.message}
                           onChange={(e) => handleInputChange(e, 'message')}
                           className="w-full rounded border border-alternative_1/30 bg-white/80 px-4 py-3 text-sm text-alternative_2 placeholder:text-alternative_1/50 transition focus:border-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40"
                           placeholder="Share your thoughts..."
                           required
                        />
                     </div>
                     {actionData?.error && (
                        <p className="text-sm text-rose-500">
                           {actionData.error}
                        </p>
                     )}
                     <button
                        type="submit"
                        className="rounded bg-alternative_2 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-primary shadow-lg shadow-alternative_2/40 transition hover:-translate-y-0.5 hover:bg-alternative_2/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/50"
                     >
                        Submit
                     </button>
                  </form>

                  <div className="space-y-5 px-4 text-sm text-alternative_2">
                     <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                           Visit us
                        </p>
                        <p className="text-alternative_1">
                           We respond within 24 hours and are happy to support
                           your next fitting.
                        </p>
                     </div>
                     <div className="space-y-4">
                        <ContactLink
                           icon={<FaPhone />}
                           label="(+84) 095-456-2311"
                           href="tel:+84954567890"
                        />
                        <ContactLink
                           icon={<FaGlobe />}
                           label="www.thesilkcharm.com"
                           href="http://www.thesilkcharm.com"
                           external
                        />
                        <ContactLink
                           icon={<FaEnvelope />}
                           label="thesilkcharm@gmail.com"
                           href="mailto:thesilkcharm@gmail.com"
                        />
                        <ContactLink
                           icon={<FaMapMarker />}
                           label="10D Ho Tung Mau Street, Mai Dich, Cau Giay, Hanoi"
                           href="https://www.google.com/maps?q=79+Ho+Tung+Mau+Street,+Mai+Dich,+Cau+Giay,+Hanoi"
                           external
                        />
                     </div>
                  </div>
               </div>
            )}
         </div>
      </section>
   );
}

type ContactLinkProps = {
   icon: React.ReactNode;
   label: string;
   href: string;
   external?: boolean;
};

const ContactLink = ({ icon, label, href, external }: ContactLinkProps) => (
   <a
      className="flex items-center gap-3 rounded border border-secondary/30 px-4 py-3 text-alternative_2 transition hover:border-secondary hover:bg-secondary/20"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
   >
      <span className="text-secondary">{icon}</span>
      <span className="text-sm">{label}</span>
   </a>
);

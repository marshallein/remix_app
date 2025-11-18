import { FaPhone, FaGlobe, FaEnvelope, FaMapMarker } from 'react-icons/fa';

export default function ContactPage() {
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

            <div className="grid gap-8 rounded border border-white/70 bg-white/85 p-8 shadow-2xl shadow-primary/30 md:grid-cols-2">
               <form className="space-y-5">
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
                        rows={5}
                        className="w-full rounded border border-alternative_1/30 bg-white/80 px-4 py-3 text-sm text-alternative_2 placeholder:text-alternative_1/50 transition focus:border-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40"
                        placeholder="Share your thoughts..."
                        required
                     />
                  </div>
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
                        We respond within 24 hours and are happy to support your
                        next fitting.
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

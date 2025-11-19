export default function AboutUsPage() {
   return (
      <section className="min-h-screen bg-gradient-to-b from-primary/70 via-white to-secondary/40">
         <div className="mx-auto max-w-5xl space-y-12 px-4 py-16 sm:px-6 lg:px-0">
            <header className="text-center space-y-3">
               <p className="text-xs uppercase tracking-[0.5em] text-secondary">
                  About us
               </p>
               <h1 className="text-4xl font-light text-alternative_2">
                  The Silk Charm
               </h1>
               <p className="text-sm text-alternative_1">
                  Modern silhouettes woven with the heritage of Vietnamese Ao
                  Dai.
               </p>
            </header>

            <div className="rounded-[5px] border border-white/70 bg-white/80 p-8 shadow-2xl shadow-primary/30 space-y-8">
               <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4 text-alternative_2">
                     <h2 className="text-2xl font-light">
                        Crafting elegance since 2004
                     </h2>
                     <p className="text-sm text-alternative_1 leading-relaxed">
                        Welcome to The Silk Charm, where the elegance of
                        traditional Vietnamese Ao Dai meets modern sensibilities.
                        With over 20 years of meticulous tailoring, our
                        high-quality garments celebrate the timeless beauty of
                        silk.
                     </p>
                  </div>
                  <div className="space-y-4 text-alternative_2">
                     <h3 className="text-lg font-semibold uppercase tracking-[0.35em]">
                        Timeless by design
                     </h3>
                     <p className="text-sm text-alternative_1 leading-relaxed">
                        Each piece in our collection is thoughtfully designed to
                        bring grace and refinement to every occasion. Discover
                        the harmony of Ao Dai and experience the magic of
                        Vietnamese craftsmanship.
                     </p>
                  </div>
               </div>

               <div className="rounded-[5px] border border-secondary/40 bg-cover bg-center p-10 text-center text-primary" style={{ backgroundImage: "url('/poster.jpg')" }}>
                  <p className="text-sm uppercase tracking-[0.35em]">
                     Hand-draped, thoughtfully designed
                  </p>
               </div>

               <div className="grid gap-8 md:grid-cols-[1.2fr,0.8fr]">
                  <div className="h-80 rounded-[5px] border border-primary/40 bg-cover bg-center" style={{ backgroundImage: "url('/aodai1.jpg')" }} />
                  <div className="space-y-4 text-alternative_2">
                     <h2 className="text-3xl font-light uppercase">
                        The Silk Charm
                     </h2>
                     <h4 className="text-lg font-semibold text-secondary uppercase tracking-[0.4em]">
                        Finest Ao Dai Store
                     </h4>
                     <p className="text-sm text-alternative_1 leading-relaxed">
                        At The Silk Charm, we are dedicated to preserving the
                        rich heritage of Vietnamese fashion while embracing
                        contemporary trends. Our commitment to quality ensures
                        that every garment is crafted to perfection.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

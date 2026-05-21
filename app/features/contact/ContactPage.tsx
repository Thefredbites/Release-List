import { ContactForm } from "./ContactForm";
import { ContactHero } from "./ContactHero";
import { ContactInfo } from "./ContactInfo";

export function ContactPage() {
  return (
    <main>
      <ContactHero />
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </section>
    </main>
  );
}

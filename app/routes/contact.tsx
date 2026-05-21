import type { Route } from "./+types/contact";
import { ContactPage } from "../features/contact/ContactPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | The Fred Bites" },
    { name: "description", content: "Contact page placeholder structure." },
  ];
}

export default function Contact() {
  return <ContactPage />;
}

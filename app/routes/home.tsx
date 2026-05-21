import type { Route } from "./+types/home";
import { WaitlistPage } from "../features/waitlist/WaitlistPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Fred Bites — Anotate en la lista" },
    {
      name: "description",
      content:
        "La tanda n°01 de The Fred Bites sale pronto. Acceso anticipado, precio de fundadores y un aviso cuando esté lista.",
    },
  ];
}

export default function Home() {
  return <WaitlistPage />;
}

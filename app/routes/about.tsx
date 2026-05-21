import type { Route } from "./+types/about";
import { AboutPage } from "../features/about/AboutPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | The Fred Bites" },
    { name: "description", content: "About page placeholder structure." },
  ];
}

export default function About() {
  return <AboutPage />;
}

import type { Route } from "./+types/menu";
import { MenuPage } from "../features/menu/MenuPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Menu | The Fred Bites" },
    { name: "description", content: "Menu page placeholder structure." },
  ];
}

export default function Menu() {
  return <MenuPage />;
}

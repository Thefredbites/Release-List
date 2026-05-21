import { MenuCard } from "./MenuCard";

const placeholderCategories = ["Starters", "Mains", "Desserts"];

export function MenuGridSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
      {placeholderCategories.map((category) => (
        <MenuCard key={category} title={category} />
      ))}
    </section>
  );
}

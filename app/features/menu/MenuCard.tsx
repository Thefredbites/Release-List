type MenuCardProps = {
  title: string;
};

export function MenuCard({ title }: MenuCardProps) {
  return (
    <article className="rounded-3xl border border-stone-200 bg-white p-6">
      <h2 className="text-xl font-medium">{title}</h2>
      <p className="mt-2 text-stone-600">Slot listo para item o categoria.</p>
    </article>
  );
}

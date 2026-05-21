type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
}: SectionIntroProps) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-stone-600">{description}</p>
      ) : null}
    </div>
  );
}

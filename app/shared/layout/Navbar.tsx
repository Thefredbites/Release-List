import { Link } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="border-b border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link className="text-sm font-semibold uppercase tracking-[0.3em]" to="/">
          The Fred Bites
        </Link>
        <nav className="hidden gap-6 text-sm text-stone-600 md:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

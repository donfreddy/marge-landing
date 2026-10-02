import Image from "next/image";
import StoreBadges from "./StoreBadges";

const NAV_LINKS = [
  { href: "#top", label: "Accueil" },
  { href: "#simulateur", label: "Simulateur" },
  { href: "#avantages", label: "Avantages" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 pb-8 pt-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-white">
            <Image src="/logo.svg" alt="" width={28} height={28} className="rounded-lg" />
            <span className="text-base font-semibold tracking-tight">Marge</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/45">
            L&apos;application qui te dit si tu peux vraiment faire cet achat, sans jamais toucher
            à tes données bancaires.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/35">Produit</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-white/55 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/35">
            Télécharger
          </p>
          <div className="mt-4">
            <StoreBadges size="sm" align="start" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-white/5 pt-6 text-xs text-white/30">
        &copy; {new Date().getFullYear()} Marge. Fait pour que tu reprennes le contrôle.
      </div>
    </footer>
  );
}

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

      <div className="mx-auto mt-14 flex max-w-6xl flex-wrap items-center gap-1.5 border-t border-white/5 pt-6 text-xs text-white/30">
        <span>
          &copy; {new Date().getFullYear()} Marge. Tous droits réservés. Un produit par
        </span>
        <a
          href="https://lehmora.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-white/40 transition-colors hover:text-white"
        >
          <svg width={13} height={13} viewBox="0 0 52 51" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M13.8567 32.9105C8.4477 32.9105 0 33.6873 0 25.8857C0 21.9174 2.88652 18.4753 7.02479 18.4753C20.5234 18.4753 31.4601 29.4119 31.4601 42.9105V43.0207C31.4601 46.905 28.3196 50.0455 24.4353 50.0455C16.7525 50.0455 17.4105 41.8534 17.4105 36.4918C17.4105 34.5083 15.8127 32.9105 13.8567 32.9105Z"
              fill="currentColor"
            />
            <path
              d="M32.8933 13.8747C32.8933 8.4657 33.67 0.017993 25.8685 0.017993C25.1956 0.017993 18.458 -0.706733 18.458 7.04279C18.458 20.5414 29.3946 31.478 42.8933 31.478C46.7656 31.478 50.0283 28.372 50.0283 24.4533C50.0283 16.7705 41.8361 17.4285 36.4745 17.4285C34.4911 17.4285 32.8933 15.8307 32.8933 13.8747Z"
              fill="currentColor"
            />
          </svg>
          <span className="font-medium">Lehmora</span>
        </a>
      </div>
    </footer>
  );
}

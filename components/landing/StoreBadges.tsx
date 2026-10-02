"use client";

import { FaApple, FaGooglePlay } from "react-icons/fa";

const STORES = [
  { Icon: FaApple, caption: "Télécharger sur", name: "App Store" },
  { Icon: FaGooglePlay, caption: "Disponible sur", name: "Google Play" },
];

export default function StoreBadges({
  size = "default",
  align = "center",
}: {
  size?: "default" | "sm";
  align?: "center" | "start";
}) {
  const isSmall = size === "sm";

  return (
    <div className={`flex flex-col gap-2 ${align === "center" ? "items-center" : "items-start"}`}>
      <div className="flex flex-wrap gap-3">
        {STORES.map(({ Icon, caption, name }) => (
          <div
            key={name}
            aria-disabled="true"
            title="Bientôt disponible"
            className={`flex cursor-not-allowed items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 opacity-60 ${
              isSmall ? "px-3 py-2" : "px-5 py-3"
            }`}
          >
            <Icon className={isSmall ? "h-4 w-4 shrink-0 text-white" : "h-6 w-6 shrink-0 text-white"} />
            <span className="text-left leading-tight">
              <span className={`block text-white/50 ${isSmall ? "text-[9px]" : "text-[10px]"}`}>
                {caption}
              </span>
              <span className={`block font-semibold text-white ${isSmall ? "text-xs" : "text-sm"}`}>
                {name}
              </span>
            </span>
          </div>
        ))}
      </div>
      {!isSmall && <p className="text-xs text-white/35">Bientôt disponible</p>}
    </div>
  );
}

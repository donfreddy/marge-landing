import { ImageResponse } from "next/og";

export const alt = "Marge : sais-tu combien tu peux vraiment dépenser ?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#09090b",
          backgroundImage: "radial-gradient(circle at 85% 20%, rgba(16,185,129,0.25), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg
            width={34}
            height={34}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v18" />
            <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
            <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
            <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
            <path d="M7 21h10" />
          </svg>
          <span style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>Marge</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 60, fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
            Tu sais combien tu as.
          </span>
          <span style={{ fontSize: 60, fontWeight: 800, color: "#10b981", lineHeight: 1.1 }}>
            Sais-tu combien tu peux
          </span>
          <span style={{ fontSize: 60, fontWeight: 800, color: "#10b981", lineHeight: 1.1 }}>
            VRAIMENT dépenser ?
          </span>
        </div>

        <div style={{ display: "flex", gap: 28 }}>
          {["100% hors-ligne", "Données sur ton téléphone", "Zéro synchronisation bancaire"].map(
            (label) => (
              <span key={label} style={{ fontSize: 20, color: "rgba(255,255,255,0.5)" }}>
                {label}
              </span>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}

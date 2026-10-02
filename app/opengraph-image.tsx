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
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden" }}>
            <svg width={40} height={40} viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="900" height="900" fill="#09090B" />
              <path
                d="M375.068 228.476C375.068 297.222 319.313 352.951 250.534 352.951C181.756 352.951 126 297.222 126 228.476C126 159.73 181.756 104 250.534 104C319.313 104 375.068 159.73 375.068 228.476Z"
                fill="#10B981"
              />
              <path
                d="M521.238 104C635.318 169.833 674.404 315.638 608.54 429.664L396.938 795.998C282.858 730.165 243.771 584.36 309.635 470.334L521.238 104Z"
                fill="#10B981"
              />
              <path
                d="M649.466 796C718.244 796 774 740.27 774 671.524C774 602.778 718.244 547.049 649.466 547.049C580.687 547.049 524.932 602.778 524.932 671.524C524.932 740.27 580.687 796 649.466 796Z"
                fill="#10B981"
              />
            </svg>
          </div>
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

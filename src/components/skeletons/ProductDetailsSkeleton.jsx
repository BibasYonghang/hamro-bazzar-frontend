const shimmer = `
  @keyframes shimmer {
    0% { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
`;

function Sk({ width, height, style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 8,
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.07) 75%)",
        backgroundSize: "600px 100%",
        animation: "shimmer 1.6s infinite",
        ...style,
      }}
    />
  );
}

export default function ProductDetailsSkeleton() {
  return (
    <>
      <style>{shimmer}</style>
      <div
        style={{
          background:
            "linear-gradient(135deg, #312e81 0%, #1e3a8a 50%, #030712 100%)",
        }}
        className="min-h-screen pb-8"
      >
        {/* Back button */}
        <div className="pt-4 pl-5">
          <Sk width={148} height={38} style={{ borderRadius: 12 }} />
        </div>

        {/* Main layout */}
        <div className="flex flex-wrap items-start mt-2">
          {/* Left: image + buy bar */}
          <div className="w-full lg:w-[45vw] px-4 box-border">
            <Sk
              width="100%"
              height={340}
              style={{ borderRadius: 24, marginTop: 8 }}
            />
            <div
              className="mt-5 flex items-center justify-between rounded-2xl p-4"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div>
                <Sk width={70} height={14} style={{ marginBottom: 8 }} />
                <Sk width={110} height={22} />
              </div>
              <Sk width={110} height={44} style={{ borderRadius: 16 }} />
            </div>
          </div>

          {/* Right: details */}
          <div className="flex-1 min-w-[260px] px-4 pt-3 box-border">
            {/* Title */}
            <Sk width="90%" height={36} style={{ marginBottom: 10 }} />
            <Sk width="65%" height={36} style={{ marginBottom: 16 }} />

            {/* Reviews */}
            <Sk width={140} height={16} style={{ marginBottom: 24 }} />

            {/* Description */}
            {["100%", "100%", "80%", "95%", "60%"].map((w, i) => (
              <Sk key={i} width={w} height={15} style={{ marginBottom: 8 }} />
            ))}

            {/* Highlights label */}
            <Sk
              width={100}
              height={28}
              style={{ borderRadius: 12, marginTop: 12, marginBottom: 16 }}
            />

            {/* Highlight items */}
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl p-3"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <Sk
                    width={20}
                    height={20}
                    style={{ borderRadius: "50%", flexShrink: 0 }}
                  />
                  <Sk width="100%" height={14} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

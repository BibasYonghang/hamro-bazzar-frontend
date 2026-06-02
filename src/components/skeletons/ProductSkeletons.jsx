import React from "react";

const shimmer = `
  @keyframes shimmer {
    0% { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
`;

function Sk({ width, height, className = "", style = {} }) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius: 8,
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "600px 100%",
        animation: "shimmer 1.6s infinite",
        ...style,
      }}
    />
  );
}

export default function ProductSkeleton() {
  return (
    <>
      <style>{shimmer}</style>
      <div className="min-h-screen bg-sky-50">
        {/* Hero skeleton */}
        <div className="bg-white border-b border-sky-100 px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Sk width={40} height={40} style={{ borderRadius: 8 }} />
            <Sk width={220} height={40} />
          </div>
          <Sk width={480} height={18} style={{ marginBottom: 10 }} />
          <Sk width={360} height={18} style={{ marginBottom: 28 }} />
          <div className="flex items-center gap-5">
            <Sk width={110} height={18} />
            <Sk width={6} height={6} style={{ borderRadius: "50%" }} />
            <Sk width={90} height={18} />
            <Sk width={6} height={6} style={{ borderRadius: "50%" }} />
            <Sk width={120} height={18} />
          </div>
        </div>

        <div className="px-4 py-8">
          {/* Search & filter bar skeleton */}
          <div className="bg-white border border-sky-100 rounded-2xl p-5 mb-8 shadow-sm">
            <div className="flex flex-wrap gap-3 items-center">
              <Sk
                style={{ flex: 1, minWidth: 200, height: 44, borderRadius: 12 }}
              />
              <Sk width={160} height={44} style={{ borderRadius: 12 }} />
              <Sk width={160} height={44} style={{ borderRadius: 12 }} />
              <Sk width={88} height={44} style={{ borderRadius: 12 }} />
              <Sk width={100} height={44} style={{ borderRadius: 12 }} />
            </div>
            <Sk width={180} height={14} style={{ marginTop: 16 }} />
          </div>

          {/* Product grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-sky-100 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Image */}
                <Sk style={{ width: "100%", height: 200, borderRadius: 0 }} />

                <div className="p-5">
                  {/* Category badge */}
                  <Sk
                    width={70 + (i % 3) * 15}
                    height={20}
                    style={{ borderRadius: 20, marginBottom: 10 }}
                  />
                  {/* Title lines */}
                  <Sk width="100%" height={16} style={{ marginBottom: 6 }} />
                  <Sk
                    width={`${60 + (i % 4) * 10}%`}
                    height={16}
                    style={{ marginBottom: 12 }}
                  />
                  {/* Description lines */}
                  <Sk
                    width={`${70 + (i % 3) * 8}%`}
                    height={13}
                    style={{ marginBottom: 6 }}
                  />
                  <Sk
                    width={`${45 + (i % 5) * 10}%`}
                    height={13}
                    style={{ marginBottom: 16 }}
                  />
                  {/* Price */}
                  <Sk
                    width={80 + (i % 3) * 10}
                    height={22}
                    style={{ marginBottom: 16 }}
                  />
                  {/* Buttons */}
                  <div
                    className="flex gap-2 pt-4"
                    style={{ borderTop: "1px solid #f0f0f0" }}
                  >
                    <Sk style={{ flex: 1, height: 36, borderRadius: 8 }} />
                    <Sk style={{ flex: 1, height: 36, borderRadius: 8 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination skeleton */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <Sk width={80} height={36} style={{ borderRadius: 8 }} />
            {[1, 2, 3].map((n) => (
              <Sk key={n} width={36} height={36} style={{ borderRadius: 8 }} />
            ))}
            <Sk width={24} height={16} style={{ borderRadius: 8 }} />
            <Sk width={36} height={36} style={{ borderRadius: 8 }} />
            <Sk width={80} height={36} style={{ borderRadius: 8 }} />
          </div>
        </div>
      </div>
    </>
  );
}

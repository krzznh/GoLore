import { useState } from "react";

export default function SafeImage({ src, alt, className = "", imgClassName = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-paper2 text-drift ${className}`}
      >
        <span className="font-hand text-2xl">No photo yet</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

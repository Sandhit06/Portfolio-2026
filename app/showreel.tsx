"use client";

import { useEffect, useRef } from "react";

/** Muted decorative reel. The dock's motion control also controls playback. */
export default function Showreel({ paused }: { paused: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;
    let disposed = false;

    const syncPlayback = () => {
      if (disposed || paused || !visible || document.hidden) {
        video.pause();
      } else {
        // Autoplay may be blocked by power-saving settings; the poster remains.
        void video.play().catch(() => {});
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [paused]);

  return (
    <figure className="showreel" aria-label="Sandhit's portfolio motion reel">
      <div className="showreel-frame">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/showreel-poster.webp"
          width="1280"
          height="720"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src="/showreel.mp4" type="video/mp4" />
        </video>
        <span className="reel-badge" aria-hidden="true">
          <span /> SELECTED WORK IN MOTION
        </span>
      </div>
      <figcaption className="showreel-caption">
        <span>IDEAS INTO REAL THINGS.</span>
        <span>KEEP SCROLLING ↓</span>
      </figcaption>
    </figure>
  );
}

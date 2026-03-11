import { useMemo, useRef } from "react";
import predictionsData, { getPredictionsSortedByWinProb } from "../data/predictions";
import Podium from "./podium";
import "./winner_background.css";

const introVideos = import.meta.glob("../assets/F1 Intros/*/*.mp4", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const DRIVER_VIDEO_ALIASES: Record<string, string> = {
  STR: "STO",
};



const getWinnerCode = () => {
  const winner = getPredictionsSortedByWinProb()[0];

  if (!winner) {
    return null;
  }

  return DRIVER_VIDEO_ALIASES[winner.driver] ?? winner.driver;
};

const getWinnerVideo = (driverCode: string | null) => {
  if (!driverCode) {
    return null;
  }

  const matches = Object.entries(introVideos)
    .filter(([path]) => path.includes(`/F1 Intros/${driverCode}/`))
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB));

  if (matches.length === 0) {
    return null;
  }

  const preferred = matches.find(([path]) => !path.includes("(1)"));
  return preferred ? preferred[1] : matches[0][1];
};

const SLOW_MO_RATE = 0.5; //


export default function WinnerBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const winnerCode = useMemo(() => getWinnerCode(), []);
  const winnerVideo = useMemo(() => getWinnerVideo(winnerCode), [winnerCode]);

    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (!video) return;
        video.defaultPlaybackRate = SLOW_MO_RATE;
        video.playbackRate = SLOW_MO_RATE;
    };


  const handleVideoEnd = () => {
    const video = videoRef.current;
    if (!video || Number.isNaN(video.duration)) {
      return;
    }
    const lastFrame = Math.max(0, video.duration - 1 / 50);
    video.currentTime = lastFrame;
    video.pause();
  };

  return (
    <section className="winner-hero">
      {winnerVideo ? (
        <video
          ref={videoRef}
          className="winner-hero__video"
          src={winnerVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
        />
      ) : (
        <div className="winner-hero__fallback" />
      )}

      <div className="winner-hero__shade" />
      <p className="winner-hero__eyebrow">{predictionsData.event.gp_name}</p>
      <div className="winner-hero__content">
        <Podium />
      </div>
    </section>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import AUDIO_SRC from "@/v2/assets/audio/calm-morning.mp3";

/* A calm ambient track that greets visitors when they land and continues
   seamlessly across page navigation, restricted to playing for 30 seconds total. */
const TOTAL_PLAY_TIME_MS = 30000;
const FADE_START_MS = 26000;
const VOLUME = 0.35;

const WelcomeAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tickTimerRef = useRef<number | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const totalPlayedMsRef = useRef<number>(0);
  const isFinished30sRef = useRef<boolean>(false);
  const isFadingRef = useRef<boolean>(false);

  const [playing, setPlaying] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const clearTimers = useCallback(() => {
    if (tickTimerRef.current) {
      window.clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    }
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const startFadeOut = useCallback(() => {
    if (isFadingRef.current || !audioRef.current) return;
    isFadingRef.current = true;
    const audio = audioRef.current;
    const startVolume = audio.volume;
    const steps = 20;
    const stepTime = 200; // 20 * 200ms = 4000ms fade (from 26s to 30s)
    let currentStep = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      currentStep++;
      if (audioRef.current) {
        audioRef.current.volume = Math.max(0, startVolume * (1 - currentStep / steps));
      }
      if (currentStep >= steps) {
        clearTimers();
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.volume = VOLUME;
        }
        setPlaying(false);
        setIntroDone(true);
        isFinished30sRef.current = true;
        isFadingRef.current = false;
      }
    }, stepTime);
  }, [clearTimers]);

  const startTracking = useCallback(() => {
    clearTimers();
    if (isFinished30sRef.current) return;

    tickTimerRef.current = window.setInterval(() => {
      totalPlayedMsRef.current += 200;

      if (totalPlayedMsRef.current >= FADE_START_MS && !isFadingRef.current) {
        startFadeOut();
      }

      if (totalPlayedMsRef.current >= TOTAL_PLAY_TIME_MS) {
        clearTimers();
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.volume = VOLUME;
        }
        setPlaying(false);
        setIntroDone(true);
        isFinished30sRef.current = true;
      }
    }, 200);
  }, [clearTimers, startFadeOut]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return Promise.reject();

    if (isFinished30sRef.current) {
      // Re-triggering resets the 30s budget
      totalPlayedMsRef.current = 0;
      isFinished30sRef.current = false;
      isFadingRef.current = false;
      setIntroDone(false);
      audio.currentTime = 0;
    }

    if (!isFadingRef.current) {
      audio.volume = VOLUME;
    }

    return audio.play().then(() => {
      setPlaying(true);
      startTracking();
    });
  }, [startTracking]);

  const pause = useCallback(() => {
    clearTimers();
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setPlaying(false);
  }, [clearTimers]);

  // Try to play on load; browsers that block autoplay get the first gesture instead
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = VOLUME;
    audioRef.current = audio;

    let cancelled = false;

    const startOnGesture = () => {
      if (cancelled || isFinished30sRef.current) return;
      play().catch(() => undefined);
      removeGestureListeners();
    };

    const removeGestureListeners = () => {
      window.removeEventListener("pointerdown", startOnGesture);
      window.removeEventListener("keydown", startOnGesture);
      window.removeEventListener("scroll", startOnGesture);
    };

    play().catch(() => {
      if (cancelled) return;
      window.addEventListener("pointerdown", startOnGesture, { once: true });
      window.addEventListener("keydown", startOnGesture, { once: true });
      window.addEventListener("scroll", startOnGesture, { once: true });
    });

    return () => {
      cancelled = true;
      removeGestureListeners();
      clearTimers();
      audio.pause();
      audioRef.current = null;
    };
  }, [play, clearTimers]);

  const toggle = () => {
    if (playing) {
      pause();
    } else {
      play().catch(() => undefined);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause sound" : "Play sound"}
      aria-pressed={playing}
      className="fixed bottom-5 left-5 z-[110] flex items-center gap-1.5 rounded-full border border-border bg-card/90 backdrop-blur px-2.5 py-1.5 shadow-card text-xs text-foreground hover:bg-card transition-colors"
    >
      {playing ? (
        <Pause className="h-3 w-3 text-primary" />
      ) : introDone ? (
        <Volume2 className="h-3 w-3 text-muted-foreground" />
      ) : (
        <Play className="h-3 w-3 text-primary" />
      )}
      <span className="hidden sm:inline">
        {playing ? "Pause sound" : introDone ? "Play sound" : "Sound"}
      </span>
    </button>
  );
};

export default WelcomeAudio;

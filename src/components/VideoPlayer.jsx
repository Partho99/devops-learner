import React, { useRef, useState, useEffect, useCallback } from "react";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume,
    Volume1,
    Volume2,
    VolumeX,
    Maximize,
    Download,
} from "lucide-react";

const DEFAULT_VIDEO = {
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "video/mp4",
    poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
    title: "Big Buck Bunny",
};

export default function VideoPlayer({
                                        src,
                                        type = "video/mp4",
                                        poster,
                                        title,
                                        onEnded,
                                        className = "",
                                    }) {
    const final = {
        src: src || DEFAULT_VIDEO.src,
        type: type || DEFAULT_VIDEO.type,
        poster: poster || DEFAULT_VIDEO.poster,
        title: title || DEFAULT_VIDEO.title,
    };

    const containerRef = useRef(null);
    const videoRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [bufferedTime, setBufferedTime] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    // Sync video properties
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.volume = volume;
        v.muted = muted;
        v.playbackRate = playbackRate;
    }, [volume, muted, playbackRate]);

    // Video events
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onLoaded = () => setDuration(isNaN(v.duration) ? 0 : v.duration);
        const onTimeUpdate = () => setCurrentTime(v.currentTime);
        const onProgress = () => {
            try {
                if (v.buffered && v.buffered.length) {
                    setBufferedTime(v.buffered.end(v.buffered.length - 1));
                }
            } catch {}
        };
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEndedLocal = () => {
            setIsPlaying(false);
            if (typeof onEnded === "function") onEnded();
        };

        v.addEventListener("loadedmetadata", onLoaded);
        v.addEventListener("timeupdate", onTimeUpdate);
        v.addEventListener("progress", onProgress);
        v.addEventListener("play", onPlay);
        v.addEventListener("pause", onPause);
        v.addEventListener("ended", onEndedLocal);

        return () => {
            v.removeEventListener("loadedmetadata", onLoaded);
            v.removeEventListener("timeupdate", onTimeUpdate);
            v.removeEventListener("progress", onProgress);
            v.removeEventListener("play", onPlay);
            v.removeEventListener("pause", onPause);
            v.removeEventListener("ended", onEndedLocal);
        };
    }, [onEnded]);

    // Keyboard shortcuts
    useEffect(() => {
        const onKey = (e) => {
            const tag = document.activeElement?.tagName;
            if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
            if (e.code === "Space") {
                e.preventDefault();
                togglePlay();
            } else if (e.key === "ArrowRight") {
                seekBy(5);
            } else if (e.key === "ArrowLeft") {
                seekBy(-5);
            } else if (e.key.toLowerCase() === "f") {
                toggleFullscreen();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [volume, duration, isPlaying]);

    const togglePlay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.paused ? v.play() : v.pause();
    }, []);

    const seekBy = (seconds = 5) => {
        const v = videoRef.current;
        if (!v) return;
        v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + seconds));
    };

    const onSeek = (e) => {
        const v = videoRef.current;
        if (!v) return;
        const val = parseFloat(e.target.value);
        v.currentTime = val;
        setCurrentTime(val);
    };

    const changeVolume = (val) => {
        const v = videoRef.current;
        setVolume(val);
        setMuted(val === 0);
        if (v) {
            v.volume = val;
            v.muted = val === 0;
        }
    };

    const toggleMute = () => {
        setMuted((m) => {
            const next = !m;
            if (videoRef.current) videoRef.current.muted = next;
            return next;
        });
    };

    const changeSpeed = (rate) => {
        setPlaybackRate(rate);
        if (videoRef.current) videoRef.current.playbackRate = rate;
    };

    const toggleFullscreen = async () => {
        try {
            const el = containerRef.current;
            if (!el) return;
            if (document.fullscreenElement) await document.exitFullscreen();
            else await el.requestFullscreen();
        } catch (e) {
            console.warn("Fullscreen not supported", e);
        }
    };

    const formatTime = (t) => {
        if (!t || isNaN(t)) return "00:00";
        const mm = Math.floor(t / 60);
        const ss = Math.floor(t % 60);
        return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
    };

    const getVolumeIcon = () => {
        if (muted || volume === 0) return <VolumeX size={16} />;
        if (volume < 0.4) return <Volume size={16} />;
        if (volume < 0.8) return <Volume1 size={16} />;
        return <Volume2 size={16} />;
    };

    return (
        <div
            ref={containerRef}
            className={`relative bg-black rounded-xl shadow-lg overflow-hidden ${className}`}
        >
            <video
                ref={videoRef}
                src={final.src}
                poster={final.poster}
                className="w-full h-auto max-h-[70vh] md:max-h-[80vh] lg:max-h-[90vh] object-contain"
                onDoubleClick={toggleFullscreen}
                onClick={togglePlay}
                title={final.title}
                controls={false}
            >
                <source src={final.src} type={final.type} />
                Your browser does not support the video tag.
            </video>

            {/* Center Play Button */}
            {!isPlaying && (
                <button
                    onClick={togglePlay}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <Play size={36} className="text-white" />
                </button>
            )}

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
                {/* Progress bar */}
                <div className="relative h-2 mb-3 rounded bg-gray-700/70">
                    <div
                        className="absolute left-0 top-0 bottom-0 bg-gray-500 rounded"
                        style={{
                            width: duration
                                ? `${(Math.min(bufferedTime, duration) / duration) * 100}%`
                                : "0%",
                        }}
                    />
                    <div
                        className="absolute left-0 top-0 bottom-0 bg-lime-600 rounded"
                        style={{
                            width: duration
                                ? `${(Math.min(currentTime, duration) / duration) * 100}%`
                                : "0%",
                        }}
                    />
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        step="0.1"
                        value={currentTime}
                        onChange={onSeek}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center gap-3 text-white text-sm">
                    {/* Left controls */}
                    <SkipBack size={18} onClick={() => seekBy(-10)} className="cursor-pointer" />
                    <button
                        onClick={togglePlay}
                        className="p-2 bg-lime-600 rounded-full hover:bg-lime-700 transition-colors"
                    >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <SkipForward size={18} onClick={() => seekBy(10)} className="cursor-pointer" />
                    <span className="ml-2 font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

                    {/* Right controls */}
                    <div className="ml-auto flex items-center gap-2">
                        <button onClick={toggleMute}>{getVolumeIcon()}</button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={muted ? 0 : volume}
                            onChange={(e) => changeVolume(parseFloat(e.target.value))}
                            className="w-20 accent-lime-600"
                        />
                        <select
                            value={playbackRate}
                            onChange={(e) => changeSpeed(parseFloat(e.target.value))}
                            className="p-1 bg-gray-800 text-white text-xs rounded"
                        >
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                <option key={rate} value={rate}>
                                    {rate}x
                                </option>
                            ))}
                        </select>
                        <button onClick={toggleFullscreen}>
                            <Maximize size={16} />
                        </button>
                        <a href={final.src} download>
                            <Download size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Subtitles,
} from 'lucide-react';

interface VideoPlayerProps {
  muxAssetId?: string;
  title?: string;
  poster?: string;
  className?: string;
}

export const VideoPlayer = ({
  muxAssetId,
  title = 'Lesson Video',
  poster,
  className,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Show controls temporarily on mouse movement
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleCaptions = useCallback(() => {
    setCaptionsEnabled(!captionsEnabled);
    // In a real implementation, this would toggle video captions
  }, [captionsEnabled]);

  const toggleFullscreen = useCallback(() => {
    if (!videoRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyC':
          e.preventDefault();
          toggleCaptions();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [togglePlay, toggleMute, toggleCaptions, toggleFullscreen]);

  // If no Mux asset, show placeholder
  if (!muxAssetId) {
    return (
      <div
        className={cn(
          'relative flex aspect-video w-full items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900',
          className
        )}
        role="img"
        aria-label="Video placeholder - no video available for this lesson"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Play className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Video content will be available soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-xl bg-black',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video element - In production, this would use Mux's player */}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={poster}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label={title}
      >
        {/* In production, add actual video sources based on muxAssetId */}
        <source
          src={`https://stream.mux.com/${muxAssetId}.m3u8`}
          type="application/x-mpegURL"
        />
        <track
          kind="captions"
          srcLang="en"
          label="English captions"
          default={captionsEnabled}
        />
      </video>

      {/* Controls overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0 hover:opacity-100'
        )}
      >
        {/* Play/pause button in center */}
        <button
          onClick={togglePlay}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 p-4 text-white transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="ml-1 h-8 w-8" />
          )}
        </button>

        {/* Bottom controls bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>

            <div className="flex-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCaptions}
              className={cn(
                'text-white hover:bg-white/20',
                captionsEnabled && 'bg-white/20'
              )}
              aria-label="Toggle captions"
              aria-pressed={captionsEnabled}
            >
              <Subtitles className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
              aria-label="Fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts help */}
      <div className="absolute right-4 top-4">
        <div className="rounded bg-black/50 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          Space: Play/Pause • M: Mute • C: Captions • F: Fullscreen
        </div>
      </div>
    </div>
  );
};

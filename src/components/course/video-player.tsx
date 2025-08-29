'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  CheckCircle2,
  Clock,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  title: string;
  description: string;
  videoId: string; // Mux asset ID or video identifier
  duration: number; // Duration in minutes
  keyPoints: string[];
  transcript?: string;
  onComplete: () => void;
  isCompleted: boolean;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  description,
  videoId,
  duration,
  keyPoints,
  transcript,
  onComplete,
  isCompleted,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate video progress for demo purposes
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const totalSeconds = duration * 60;
          const progress = (newTime / totalSeconds) * 100;
          setWatchProgress(progress);

          // Mark as complete when 90% watched
          if (progress >= 90 && !isCompleted) {
            onComplete();
            setIsPlaying(false);
          }

          return Math.min(newTime, totalSeconds);
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, duration, isCompleted, onComplete]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = duration * 60;
  const progressPercentage = (currentTime / totalSeconds) * 100;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Video Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Play className="h-5 w-5 text-primary" />
          )}
          <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
        </div>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration} minutes</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Video Player */}
      <Card>
        <CardContent className="p-0">
          <div className="relative bg-black rounded-t-lg aspect-video">
            {/* Placeholder Video Container */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-t-lg">
              {/* Demo placeholder - in real implementation, this would be a Mux player */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
                <div className="text-white">
                  <p className="text-lg font-medium">{title}</p>
                  <p className="text-sm opacity-75">
                    Video content placeholder
                  </p>
                  <p className="text-xs opacity-50 mt-2">
                    In production: Mux Video Player
                  </p>
                </div>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="space-y-3">
                {/* Progress Bar */}
                <div className="space-y-1">
                  <Progress
                    value={progressPercentage}
                    className="h-1 bg-white/20"
                  />
                  <div className="flex justify-between text-xs text-white/70">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(totalSeconds)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePlayPause}
                      className="text-white hover:bg-white/20"
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
                      onClick={handleMute}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="text-white hover:bg-white/20"
                      disabled={!transcript}
                    >
                      <BookOpen className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Points</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {keyPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-medium">
                    {index + 1}
                  </span>
                </div>
                <span className="text-sm leading-relaxed">{point}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Transcript (if available) */}
      {transcript && showTranscript && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {transcript}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Status */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
            Video Completed!
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Great job! You can move on to the next step or rewatch anytime.
          </p>
        </motion.div>
      )}

      {/* Watch Progress (for incomplete videos) */}
      {!isCompleted && watchProgress > 0 && (
        <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-primary">
            Progress: {Math.round(watchProgress)}% watched
            {watchProgress >= 90 && ' (marking as complete...)'}
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

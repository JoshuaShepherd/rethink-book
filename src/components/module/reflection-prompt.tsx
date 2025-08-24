'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Square, Play, Save, CheckCircle } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { ReflectionPayload } from '@/types/content';
import { toast } from 'react-hot-toast';

interface ReflectionPromptProps {
  activityId: string;
  payload: ReflectionPayload;
  initialValue?: string;
  onSave: (reflection: string, audioBlob?: Blob) => void;
  className?: string;
}

export const ReflectionPrompt = ({
  activityId,
  payload,
  initialValue = '',
  onSave,
  className,
}: ReflectionPromptProps) => {
  const [reflection, setReflection] = useState(initialValue);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when component mounts (for keyboard shortcut R)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const wordCount = reflection
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
  const meetsMinimum = !payload.minWords || wordCount >= payload.minWords;
  const isValidReflection = reflection.trim().length > 0 && meetsMinimum;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = event => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Auto-stop after 60 seconds
      setTimeout(() => {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === 'recording'
        ) {
          stopRecording();
        }
      }, 60000);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Unable to access microphone');
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (!audioBlob) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(URL.createObjectURL(audioBlob));
    audioRef.current = audio;
    setIsPlaying(true);

    audio.onended = () => {
      setIsPlaying(false);
      audioRef.current = null;
    };

    audio.play();
  };

  const handleSave = async () => {
    if (!isValidReflection) return;

    setIsSaving(true);
    try {
      await onSave(reflection, audioBlob || undefined);
      setLastSaved(new Date());

      // Analytics
      analytics.trackReflectionSave(activityId, wordCount);

      toast.success('Reflection saved successfully');
    } catch (error) {
      console.error('Error saving reflection:', error);
      toast.error('Failed to save reflection');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Prompt */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Reflection Prompt
        </h3>
        <p className="leading-relaxed text-foreground/90">{payload.prompt}</p>
        {payload.minWords && (
          <p className="mt-2 text-sm text-muted-foreground">
            Minimum {payload.minWords} words required
          </p>
        )}
      </div>

      {/* Text area */}
      <div className="space-y-3">
        <div>
          <label htmlFor="reflection-text" className="sr-only">
            Your reflection
          </label>
          <Textarea
            ref={textareaRef}
            id="reflection-text"
            placeholder="Share your thoughts and insights here..."
            value={reflection}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setReflection(e.target.value)
            }
            className="min-h-[200px] resize-y"
            aria-describedby="word-count reflection-help"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              id="word-count"
              className={cn(
                'text-sm',
                meetsMinimum ? 'text-muted-foreground' : 'text-destructive'
              )}
            >
              {wordCount} word{wordCount === 1 ? '' : 's'}
            </span>

            {lastSaved && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="h-3 w-3" />
                Saved at {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>

          <div id="reflection-help" className="sr-only">
            {payload.minWords &&
              !meetsMinimum &&
              `Need ${payload.minWords - wordCount} more words to meet minimum requirement`}
          </div>
        </div>
      </div>

      {/* Audio recording */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">
          Optional Audio Note (Max 60 seconds)
        </h4>

        <div className="flex items-center gap-3">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              variant="outline"
              size="sm"
              disabled={isRecording}
              aria-label="Start audio recording"
            >
              <Mic className="mr-2 h-4 w-4" />
              Record Note
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="outline"
              size="sm"
              className="animate-pulse border-red-500 text-red-600 hover:bg-red-50"
              aria-label="Stop audio recording"
            >
              <Square className="mr-2 h-4 w-4" />
              Stop Recording
            </Button>
          )}

          {audioBlob && (
            <Button
              onClick={playAudio}
              variant="outline"
              size="sm"
              aria-label={isPlaying ? 'Stop audio playback' : 'Play audio note'}
            >
              <Play className="mr-2 h-4 w-4" />
              {isPlaying ? 'Stop' : 'Play'} Note
            </Button>
          )}
        </div>

        {audioBlob && (
          <p className="text-sm text-muted-foreground">
            Audio note recorded successfully
          </p>
        )}
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={!isValidReflection || isSaving}
          aria-live="polite"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Reflection'}
        </Button>
      </div>

      {!meetsMinimum && reflection.length > 0 && (
        <div
          className="text-sm text-destructive"
          role="alert"
          aria-live="polite"
        >
          Please write at least {payload.minWords} words to complete this
          reflection.
        </div>
      )}
    </div>
  );
};

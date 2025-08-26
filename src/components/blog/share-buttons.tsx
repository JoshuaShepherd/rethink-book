'use client';

import React from 'react';
import { Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    if (typeof window === 'undefined') return;

    const shareUrl = encodeURIComponent(url || window.location.href);
    const shareTitle = encodeURIComponent(title);

    let platformUrl = '';
    switch (platform) {
      case 'twitter':
        platformUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
        break;
      case 'facebook':
        platformUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'linkedin':
        platformUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
    }

    if (platformUrl) {
      window.open(platformUrl, '_blank', 'width=600,height=400');
    }
  };

  const copyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url || window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="glass-card"
        onClick={() => handleShare('twitter')}
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="glass-card"
        onClick={() => handleShare('facebook')}
      >
        <Facebook className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="glass-card"
        onClick={() => handleShare('linkedin')}
      >
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="glass-card"
        onClick={copyLink}
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}

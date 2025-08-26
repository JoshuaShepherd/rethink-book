'use client';

import React from 'react';
import { Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareDiscussionProps {
  title: string;
  url?: string;
}

export function ShareDiscussion({ title, url }: ShareDiscussionProps) {
  const handleShare = (platform: string) => {
    if (typeof window === 'undefined') return;

    const shareUrl = encodeURIComponent(url || window.location.href);
    const shareTitle = encodeURIComponent(title);

    let platformUrl = '';
    switch (platform) {
      case 'twitter':
        platformUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
        break;
      case 'linkedin':
        platformUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
    }

    if (platformUrl) {
      window.open(platformUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      <Button
        variant="outline"
        className="glass-card"
        onClick={() => handleShare('twitter')}
      >
        <Twitter className="w-4 h-4 mr-2" />
        Discuss on Twitter
      </Button>
      <Button
        variant="outline"
        className="glass-card"
        onClick={() => handleShare('linkedin')}
      >
        <Linkedin className="w-4 h-4 mr-2" />
        Share on LinkedIn
      </Button>
    </div>
  );
}

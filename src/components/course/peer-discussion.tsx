'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Users,
  MessageSquare,
  Heart,
  Reply,
  Send,
  ThumbsUp,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PeerDiscussionProps {
  title: string;
  description: string;
  prompt: string;
  forumType: 'discussion' | 'share' | 'feedback' | 'accountability';
  estimatedTime: string;
  onParticipate: () => void;
  isCompleted: boolean;
  className?: string;
}

interface MockPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: MockReply[];
  isOwn?: boolean;
}

interface MockReply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

// Mock discussion data
const mockPosts: MockPost[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    avatar: '🧑‍💼',
    content:
      'My biggest "aha" moment was realizing that my work in marketing isn\'t separate from my calling - it\'s actually a primary way I can serve others and build relationships for the Kingdom. I used to see work as just paying the bills, but now I see it as ministry.',
    timestamp: '2 hours ago',
    likes: 8,
    replies: [
      {
        id: '1-1',
        author: 'Mike Rodriguez',
        avatar: '👨‍🎓',
        content:
          "That's beautiful, Sarah! I had a similar realization about my teaching role.",
        timestamp: '1 hour ago',
        likes: 3,
      },
    ],
  },
  {
    id: '2',
    author: 'David Kim',
    avatar: '👨‍⚕️',
    content:
      "As a nurse, I always knew healthcare was meaningful, but the Covo framework helped me see how I can intentionally disciple colleagues and patients. It's not about adding ministry ON TOP of work - it's seeing work itself as ministry.",
    timestamp: '4 hours ago',
    likes: 12,
    replies: [],
  },
];

export const PeerDiscussion: React.FC<PeerDiscussionProps> = ({
  title,
  description,
  prompt,
  forumType,
  estimatedTime,
  onParticipate,
  isCompleted,
  className,
}) => {
  const [userPost, setUserPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [posts, setPosts] = useState<MockPost[]>(mockPosts);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handlePost = async () => {
    if (!userPost.trim()) return;

    setIsPosting(true);

    // Simulate posting delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newPost: MockPost = {
      id: Date.now().toString(),
      author: 'You',
      avatar: '👤',
      content: userPost,
      timestamp: 'Just now',
      likes: 0,
      replies: [],
      isOwn: true,
    };

    setPosts(prev => [newPost, ...prev]);
    setUserPost('');
    onParticipate();
    setIsPosting(false);
  };

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleReply = async (postId: string) => {
    if (!replyText.trim()) return;

    const newReply: MockReply = {
      id: Date.now().toString(),
      author: 'You',
      avatar: '👤',
      content: replyText,
      timestamp: 'Just now',
      likes: 0,
    };

    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, replies: [...post.replies, newReply] }
          : post
      )
    );

    setReplyText('');
    setReplyTo(null);
  };

  const getForumTypeInfo = () => {
    switch (forumType) {
      case 'discussion':
        return {
          icon: MessageSquare,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-950/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          label: 'Discussion Forum',
        };
      case 'share':
        return {
          icon: Heart,
          color: 'text-pink-600',
          bgColor: 'bg-pink-50 dark:bg-pink-950/20',
          borderColor: 'border-pink-200 dark:border-pink-800',
          label: 'Sharing Circle',
        };
      case 'feedback':
        return {
          icon: ThumbsUp,
          color: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-950/20',
          borderColor: 'border-green-200 dark:border-green-800',
          label: 'Feedback Exchange',
        };
      case 'accountability':
        return {
          icon: Users,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50 dark:bg-orange-950/20',
          borderColor: 'border-orange-200 dark:border-orange-800',
          label: 'Accountability Group',
        };
      default:
        return {
          icon: Users,
          color: 'text-primary',
          bgColor: 'bg-primary/5',
          borderColor: 'border-primary/20',
          label: 'Peer Activity',
        };
    }
  };

  const forumInfo = getForumTypeInfo();

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <forumInfo.icon className={cn('h-5 w-5', forumInfo.color)} />
          )}
          <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
        </div>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{estimatedTime}</span>
          </div>

          <Badge variant="outline" className="text-xs">
            {forumInfo.label}
          </Badge>

          {isCompleted && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Participated</span>
            </div>
          )}
        </div>
      </div>

      {/* Discussion Prompt */}
      <Card className={cn(forumInfo.bgColor, forumInfo.borderColor)}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <forumInfo.icon
              className={cn('h-5 w-5 flex-shrink-0 mt-0.5', forumInfo.color)}
            />
            <div>
              <h4 className="font-medium mb-2">Discussion Prompt</h4>
              <p className="text-lg leading-relaxed">{prompt}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Post Creation */}
      {!isCompleted && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Share Your Thoughts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={userPost}
                onChange={e => setUserPost(e.target.value)}
                placeholder="Share your insights, experiences, or questions here..."
                className="min-h-[120px]"
              />

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {userPost && (
                    <span>{userPost.trim().split(/\s+/).length} words</span>
                  )}
                </div>

                <Button
                  onClick={handlePost}
                  disabled={!userPost.trim() || isPosting}
                  size="lg"
                  className="px-6"
                >
                  {isPosting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="mr-2"
                      >
                        <Send className="h-4 w-4" />
                      </motion.div>
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Post to Discussion
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discussion Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Community Discussion</h3>
          <Badge variant="secondary" className="text-xs">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </Badge>
        </div>

        <div className="space-y-4">
          {posts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                className={cn(
                  'transition-all duration-200',
                  post.isOwn && 'ring-1 ring-primary/20 bg-primary/5'
                )}
              >
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Post Header */}
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{post.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{post.author}</span>
                          {post.isOwn && (
                            <Badge variant="secondary" className="text-xs">
                              You
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">
                            •
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {post.timestamp}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">
                          {post.content}
                        </p>
                      </div>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center gap-4 pt-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1 text-sm"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setReplyTo(replyTo === post.id ? null : post.id)
                        }
                        className="flex items-center gap-1 text-sm"
                      >
                        <Reply className="h-3 w-3" />
                        <span>Reply ({post.replies.length})</span>
                      </Button>
                    </div>

                    {/* Replies */}
                    {post.replies.length > 0 && (
                      <div className="ml-8 space-y-3 pt-3 border-t border-muted">
                        {post.replies.map(reply => (
                          <div
                            key={reply.id}
                            className="flex items-start gap-3"
                          >
                            <div className="text-lg">{reply.avatar}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">
                                  {reply.author}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  •
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {reply.timestamp}
                                </span>
                              </div>
                              <p className="text-sm leading-relaxed">
                                {reply.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Form */}
                    {replyTo === post.id && (
                      <div className="ml-8 space-y-3 pt-3 border-t border-muted">
                        <Textarea
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="min-h-[80px]"
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleReply(post.id)}
                            disabled={!replyText.trim()}
                            size="sm"
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setReplyTo(null);
                              setReplyText('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Completion Status */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
            Great Discussion Participation!
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Thank you for contributing to the community discussion. Your
            insights help everyone learn and grow together.
          </p>
        </motion.div>
      )}

      {/* Community Guidelines */}
      {!isCompleted && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                  Community Guidelines
                </h4>
                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                  <li>• Be respectful and encouraging in all interactions</li>
                  <li>• Share authentically from your own experience</li>
                  <li>• Ask questions and engage thoughtfully with others</li>
                  <li>• Maintain confidentiality when appropriate</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PeerDiscussion;

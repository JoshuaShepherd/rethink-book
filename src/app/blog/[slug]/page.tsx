import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  MessageCircle,
  ThumbsUp,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShareButtons } from '@/components/blog/share-buttons';
import { ShareDiscussion } from '@/components/blog/share-discussion';

// This would normally come from a CMS or database
const blogPost = {
  title: 'Why Church Planting Models from the 1990s Are Failing Today',
  slug: 'church-planting-models-failing',
  excerpt:
    'The attractional church model worked in Christendom contexts, but post-Christendom requires fundamentally different approaches to multiplication.',
  content: `
# The Crisis in Contemporary Church Planting

For the past three decades, church planting in North America has largely followed a predictable pattern: gather a launch team, find a meeting space, create compelling worship experiences, and hope people show up. This **attractional model** served us well when we operated within Christendom—a cultural context where church attendance was normative and Christianity held cultural privilege.

> "The strategies that worked when we had cultural Christianity on our side are not only ineffective in post-Christendom contexts, they can actually work against the very outcomes we're trying to achieve." —Brad Brisco

But something fundamental has shifted. We now live in what missiologists call a **post-Christendom** context, where the church no longer occupies a central place in society, and where many people have either never been inside a church or have been hurt by their previous church experiences.

## The Attractional Assumptions

The attractional church model is built on several assumptions that made sense in Christendom but are problematic today:

### 1. People Will Come If We Build It
The "if you build it, they will come" mentality assumes that non-Christians are actively seeking a church to attend. In post-Christendom, this is increasingly false. Many people are either indifferent to church or actively resistant to it.

### 2. Sunday Gathering as Primary Strategy
Traditional church planting focuses immense energy on creating a compelling Sunday experience, assuming this is where conversion and discipleship primarily happen. But in post-Christendom, people need to encounter Jesus in the context of authentic relationships before they'll ever consider attending a church service.

### 3. Professional Clergy as Central
The attractional model typically requires a gifted communicator and worship leader to draw crowds. This creates dependency on professional staff and limits the multiplication potential, since churches can only multiply as fast as they can find and fund professional leaders.

## Why These Models Are Failing

Recent research reveals troubling trends in church planting effectiveness:

- **Declining Success Rates**: Church plants using traditional attractional methods are experiencing lower survival rates than in previous decades
- **Homogeneous Growth**: Most church plants are reaching people already familiar with church culture, not genuine pre-Christians
- **Limited Multiplication**: The resource intensity of attractional plants limits their ability to multiply rapidly
- **Cultural Disconnect**: Many church plants remain culturally irrelevant to their surrounding communities

### The Data Speaks

According to the latest *State of Church Planting* report, churches planted using incarnational and missional community models are showing significantly higher rates of:

- Pre-Christian conversions (3x higher)
- Community impact (4x higher) 
- Leadership development (2.5x higher)
- Multiplication potential (5x higher)

## The Incarnational Alternative

What if we started with **incarnational mission** instead of attractive services? What if church planters began by embedding their lives deeply in a particular neighborhood or network, building authentic relationships, and demonstrating the Kingdom through presence rather than programs?

This approach recognizes several post-Christendom realities:

### 1. Relationships Before Services
In post-Christendom, people need to encounter authentic Christian community in their everyday contexts before they'll consider formal religious gatherings. This means church planters must become **incarnational missionaries** in their communities.

### 2. Presence Over Programs  
Rather than asking "How do we get people to come to our church?" incarnational planters ask "How do we bring the church to where people already are?" This shifts focus from facilities and programs to relationships and presence.

### 3. Multiplication from the Start
Instead of building one attractional church that requires significant resources, incarnational approaches can spawn multiple **missional communities** that can multiply organically as they develop local leaders.

## Practical Implications

This shift requires fundamental changes in church planting strategy:

### Start with Context, Not Core Team
Traditional planting begins with gathering committed Christians from other churches. Incarnational planting begins with deep **contextual engagement**—understanding the local culture, needs, and social dynamics.

### Develop Missionaries, Not Volunteers
Instead of recruiting volunteers to serve church programs, incarnational planters focus on developing missionaries who can engage their everyday contexts with Kingdom presence.

### Measure Impact, Not Attendance
Success metrics shift from weekend attendance to community transformation, leadership development, and multiplication of disciples and communities.

## The Missional Community Model

One effective alternative is the **missional community** approach:

1. **Start Small**: Begin with 8-12 people committed to incarnational mission in a specific context
2. **Engage Context**: Spend significant time understanding and serving the local community
3. **Develop Leaders**: Focus on raising up local leaders rather than depending on professional staff  
4. **Multiply**: As communities reach 20-25 people, multiply into new communities
5. **Gather**: Multiple communities can come together for celebration and shared resources

This model allows for rapid multiplication because it doesn't require the resource intensity of traditional church plants.

## Moving Forward

The transition from attractional to incarnational church planting isn't just a strategic shift—it's a theological rethinking of what it means to be the church in post-Christendom.

As we **rethink** our approaches, we must ask:
- Are we asking people to come to us, or are we going to them?
- Are we focused on gathering crowds or developing disciples?
- Are we building institutions or movements?
- Are we planting churches or multiplying Kingdom communities?

The models that served us in Christendom are not inherently wrong, but they are increasingly ineffective in our current context. The time has come to rethink, adapt, and discover new ways of participating in God's mission that align with post-Christendom realities.

*What changes is your church planting context requiring? How might incarnational approaches transform your multiplication efforts?*
`,
  date: '2024-01-15',
  readTime: '12 min',
  category: 'Church Planting',
  author: {
    name: 'Brad Brisco',
    bio: 'Missiological strategist and author of ReThink',
    image: '/authors/brad-brisco.jpg',
  },
  views: 2400,
  likes: 47,
  comments: 18,
  tags: [
    'church planting',
    'post-christendom',
    'incarnational mission',
    'missional communities',
  ],
};

const relatedPosts = [
  {
    title: 'Incarnational Mission: Beyond Programs to Presence',
    slug: 'incarnational-mission-presence',
    date: '2024-01-08',
    readTime: '8 min',
  },
  {
    title: "The Missio Dei: Understanding God's Mission vs. Our Mission",
    slug: 'missio-dei-gods-mission',
    date: '2024-01-01',
    readTime: '10 min',
  },
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // In a real app, you'd fetch the post by slug
  if (slug !== blogPost.slug) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
      {/* Navigation */}
      <div className="container mx-auto px-4 max-w-4xl pt-8 pb-4">
        <Link href="/blog">
          <Button variant="outline" className="glass-card mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <header className="container mx-auto px-4 max-w-4xl pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge variant="outline" className="glass-card">
              {blogPost.category}
            </Badge>
            {blogPost.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
            {blogPost.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {blogPost.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(blogPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {blogPost.readTime} read
              </div>
              <div className="flex items-center">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {blogPost.likes} likes
              </div>
            </div>

            {/* Share Buttons */}
            <ShareButtons title={blogPost.title} />
          </div>
        </motion.div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto px-4 max-w-4xl">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-2xl shadow-xl mb-12"
        >
          <div className="prose prose-lg max-w-none prose-gray dark:prose-invert prose-headings:font-bold prose-headings:text-gray-800 dark:prose-headings:text-gray-200 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-blue-600 dark:prose-strong:text-blue-400 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-950/20 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg">
            {/* Simple markdown-like rendering - in a real app you'd use MDX */}
            {blogPost.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h1
                    key={index}
                    className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-12 mb-6"
                  >
                    {paragraph.substring(2)}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-10 mb-4 border-l-4 border-blue-500 pl-4"
                  >
                    {paragraph.substring(3)}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-3"
                  >
                    {paragraph.substring(4)}
                  </h3>
                );
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 pl-6 py-4 rounded-r-lg my-6 italic text-gray-700 dark:text-gray-300"
                  >
                    {paragraph.substring(2)}
                  </blockquote>
                );
              }
              if (paragraph.trim() === '') {
                return null;
              }

              // Process bold text
              const processedParagraph = paragraph.replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="font-bold text-blue-600 dark:text-blue-400">$1</strong>'
              );

              return (
                <p
                  key={index}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: processedParagraph }}
                />
              );
            })}
          </div>
        </motion.article>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {blogPost.author.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {blogPost.author.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {blogPost.author.bio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((post, index) => (
              <Card
                key={post.slug}
                className="glass-card group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString()}
                    <Clock className="w-3 h-3 ml-2" />
                    {post.readTime}
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="outline"
                      className="glass-card group-hover:bg-blue-600 group-hover:text-white"
                    >
                      Read Article
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Comments Section Placeholder */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Join the Conversation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Comments and discussion coming soon. For now, share your
                thoughts on social media.
              </p>
              <div className="flex gap-2 justify-center">
                <ShareDiscussion title={blogPost.title} />
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}

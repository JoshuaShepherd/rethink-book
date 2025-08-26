'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  User,
  Eye,
  Menu,
  X,
  Home,
  Settings,
  Bookmark,
  Search,
  ChevronDown,
  ChevronUp,
  Quote as QuoteIcon,
  Lightbulb,
  Target,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Table of Contents Data
const tableOfContents = [
  {
    slug: 'introduction',
    title: 'Introduction',
    chapter: 0,
    type: 'chapter' as const,
  },
  {
    slug: 'principle-1',
    title: 'PRINCIPLE 1: RETHINK THE MISSIONARY NATURE OF GOD',
    chapter: 1,
    type: 'principle' as const,
  },
  {
    slug: 'principle-2',
    title: 'PRINCIPLE 2: RETHINK THE MISSIONARY NATURE OF THE CHURCH',
    chapter: 2,
    type: 'principle' as const,
  },
  {
    slug: 'principle-3',
    title: 'PRINCIPLE 3: INCARNATIONAL MISSION',
    chapter: 3,
    type: 'principle' as const,
  },
  {
    slug: 'principle-4',
    title: 'PRINCIPLE 4: RETHINK MISSIO DEI',
    chapter: 4,
    type: 'principle' as const,
  },
  {
    slug: 'principle-5',
    title: 'PRINCIPLE 5: POST-CHRISTENDOM',
    chapter: 5,
    type: 'principle' as const,
  },
  {
    slug: 'principle-6',
    title: 'PRINCIPLE 6: RETHINK PLACE',
    chapter: 6,
    type: 'principle' as const,
  },
  {
    slug: 'principle-7',
    title: 'PRINCIPLE 7: RETHINK VOCATION',
    chapter: 7,
    type: 'principle' as const,
  },
  {
    slug: 'principle-8',
    title: 'PRINCIPLE 8: RETHINK MULTIPLICATION',
    chapter: 8,
    type: 'principle' as const,
  },
  {
    slug: 'principle-9',
    title: 'PRINCIPLE 9: RETHINK TEAMS',
    chapter: 9,
    type: 'principle' as const,
  },
  {
    slug: 'principle-10',
    title: 'PRINCIPLE 10: RETHINK STRATEGIES AND MODELS',
    chapter: 10,
    type: 'principle' as const,
  },
  {
    slug: 'principle-11',
    title: 'PRINCIPLE 11: RETHINK FLOW',
    chapter: 11,
    type: 'principle' as const,
  },
  {
    slug: 'principle-12',
    title: 'PRINCIPLE 12: RETHINK SCORECARDS',
    chapter: 12,
    type: 'principle' as const,
  },
];

// Sample content for different chapters
const chapterContents: Record<string, string> = {
  introduction: `# INTRODUCTION

> "The illiterate of the 21st century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn." —Alvin Toffler

When bringing about change in the way people behave, we often need to start with questions of "why" before considering the practical issues of "how." In the book **Start with Why: How Great Leaders Inspire Everyone to Take Action**, Simon Sinek contends that there are two primary ways to influence human behavior: you can either manipulate it or inspire it.

While manipulation is not always negative, for example when a retailer drops the price of a product to motivate a purchase, it often involves the use of fear or peer pressure to influence behavior. Additionally, change that is manipulated is usually short-lived.

Inspiring change, on the other hand, involves the consideration of deeper issues. We need to ask underlying questions of "why." Why do we perceive things in a particular way? Why do we behave in a certain manner? What are the motivations or inherent factors that undergird our behaviors?

## The Challenge of Change

This topic of change is important in church **multiplication** because responses to the crises of the church in North America will not be organizational changes. We can't settle with minor adjustments in our **ecclesiology**, how we do church. The problem is deeply rooted.

We must **rethink** to make cultural changes and ask the "why" questions. The underlying issues are primarily spiritual, theological, and **missiological**. If we want to plant disciple-making, **missional** churches that have a mindset of **multiplication**, it will take deep cultural change in the way we think about God's mission and the nature of the church.

## A Call to Transformation

The church in North America is at a crossroads. We can continue with business as usual, making minor adjustments and hoping for different results. Or we can embrace the challenge of fundamental transformation—rethinking our most basic assumptions about God, mission, and the nature of the church.

This transformation requires more than organizational restructuring or program changes. It demands a paradigm shift that touches the very core of how we understand our identity and purpose as followers of Jesus Christ.

### The Rethink Framework

Throughout this exploration, we will examine twelve key principles that challenge conventional thinking and offer fresh perspectives on mission and church life:

1. **The Missionary Nature of God** - Understanding mission as originating from God's character
2. **The Missionary Nature of the Church** - Recognizing the church as fundamentally missional
3. **Incarnational Mission** - Embodying Christ's presence in local contexts
4. **Missio Dei** - Participating in God's mission rather than creating our own
5. **Post-Christendom Reality** - Adapting to a changed cultural landscape
6. **Place-Based Ministry** - Engaging meaningfully with local communities
7. **Vocational Calling** - Integrating faith and work
8. **Multiplication Mindset** - Thinking beyond addition to exponential growth
9. **Team-Based Approach** - Building collaborative leadership structures
10. **Strategic Models** - Developing contextually appropriate methods
11. **Flow and Movement** - Creating sustainable momentum
12. **Scorecard Metrics** - Measuring what truly matters

Each principle challenges us to examine our assumptions and embrace new ways of thinking about ministry and mission. Together, they form a comprehensive framework for transformation that addresses both theological foundations and practical implementation.`,

  'principle-1': `# PRINCIPLE 1: RETHINK THE MISSIONARY NATURE OF GOD

> "Mission is not primarily an activity of the church, but an attribute of God." —David Bosch

The most foundational **missiological** shift that must take place for many Christians relates to their understanding of the missionary nature of God and the church. Let's first consider the missionary nature of God then discuss implications on the way we understand the church.

When we think about the attributes of God, we most often think of characteristics such as holiness, sovereignty, wisdom, justice, love, and so forth. Rarely do we think of God's missionary nature. But Scripture teaches that God is a missionary God, a sending God.

## The Grand Narrative

The missionary nature of God can be framed in two primary ways. The first involves the grand narrative of Scripture. When we consider the grand story or metanarrative of Scripture, we discover it is about God's redemptive purposes. All Scripture and doctrines of biblical faith connect around God's grand plan and purpose for creation.

Mission is the central theme describing God's activity throughout history to restore creation. The mission of God unifies the Bible from creation to new creation.

> "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." —John 3:16

This familiar verse reveals the heart of God's missionary nature. God's love for the world—the ***cosmos***—drove Him to send His Son. The Greek word ***kosmos*** refers not just to humanity but to all of creation. God's mission encompasses the restoration of everything that has been broken by sin.

## Sending Language

A second way to recognize God's missionary nature is to examine the "sending language" throughout the Bible. From God sending Abram in Genesis 12 to the sending of His angel in Revelation 22, hundreds of sending examples portray God as a missionary-sending God.

The Hebrew verb ***shelach***, meaning "to send," is found nearly 800 times in the Old Testament. While it is often used in a variety of non-theological sayings and phrases, it is employed more than 200 times with God as the subject of the verb.

### Old Testament Sending

> "So now, go. I am sending you to Pharaoh to bring my people the Israelites out of Egypt." But Moses said to God, "Who am I that I should go to Pharaoh and bring the Israelites out of Egypt?" And God said, "I will be with you. And this will be the sign to you that it is I who have sent you: When you have brought the people out of Egypt, you will worship God on this mountain." —Exodus 3:10-12

This passage demonstrates God's pattern of sending. Notice several key elements:

1. **Divine Initiative** - God takes the initiative to send
2. **Specific Mission** - There is a clear purpose and objective  
3. **Divine Presence** - God promises to be with the one sent
4. **Authentication** - God provides signs to validate the sending

Throughout the Old Testament, we see God sending prophets, judges, kings, and ordinary people to accomplish His purposes. Each sending reflects God's missionary heart to reach people and restore relationships.

### New Testament Fulfillment

The New Testament reveals the ultimate expression of God's missionary nature in the sending of Jesus Christ. The Greek verb ***apostello***, meaning "to send forth" or "to commission," appears over 130 times in the New Testament.

> "As the Father has sent me, I am sending you." —John 20:21

Jesus' words establish the pattern of mission that flows from the Father's heart. Just as the Father sent the Son, the Son sends His followers. This creates an unbroken chain of sending that originates in the Triune God and extends through the church to the world.

## Trinitarian Mission

The missionary nature of God is rooted in the Trinity itself. Each person of the Trinity participates in the mission of redemption:

- **The Father** sends the Son and the Holy Spirit
- **The Son** is sent by the Father and sends the disciples  
- **The Holy Spirit** is sent by the Father and Son to empower mission

This Trinitarian understanding of mission has profound implications. Mission is not something external to God's nature—it flows from the very essence of who God is. The Trinity demonstrates perfect community, and God's mission aims to restore broken community throughout creation.

## Implications for the Church

When we understand God's missionary nature, it transforms how we view the church and our role in God's purposes. Several implications emerge:

### 1. Mission is God's Initiative

We don't create mission—we join God's mission that is already underway. This relieves us of the burden of generating mission from our own efforts and resources. Instead, we seek to discern where God is already working and align ourselves with His purposes.

### 2. Mission Has Theological Foundation

Mission is not merely a human activity or church program. It is grounded in the character and purposes of God. This gives mission ultimate significance and provides the theological foundation for all missionary activity.

### 3. The Church is Missional by Nature

If God is missionary by nature, and the church is the people of God, then the church is inherently missional. Mission is not one activity among many—it is the defining characteristic of what it means to be the church.

### 4. We Participate in Something Greater

Understanding God's missionary nature helps us see that we are part of a cosmic drama of redemption that began before creation and will culminate in new creation. This gives eternal significance to our missionary participation.

## Rethinking Our Approach

This principle challenges us to rethink several common approaches to mission:

### From Program to Nature
Rather than viewing mission as a program or department of the church, we recognize it as the fundamental nature of both God and the church.

### From Human Initiative to Divine Initiative  
Instead of creating our own missionary strategies, we seek to discern and join God's missionary activity that is already taking place.

### From Activity to Identity
Mission moves from something we do to something we are. Our identity as God's people is inherently missionary.

### From Addition to Multiplication
When we understand God's expansive missionary heart, we begin to think in terms of multiplication rather than mere addition to our congregations.

## Practical Applications

Understanding God's missionary nature should transform how we:

1. **Pray** - We ask God to reveal where He is working and how we can join Him
2. **Plan** - Our strategies align with God's purposes rather than our own agenda  
3. **Participate** - We see every believer as sent by God for missionary purposes
4. **Prioritize** - Mission becomes central to all church activities and decisions
5. **Proclaim** - We share the gospel as participants in God's cosmic plan of redemption

The missionary nature of God is not merely an abstract theological concept—it is a practical reality that should shape every aspect of church life and Christian discipleship. When we truly grasp that we serve a missionary God, it transforms everything.`,

  'principle-2': `# PRINCIPLE 2: RETHINK THE MISSIONARY NATURE OF THE CHURCH

> "The church is the only organization that exists for the benefit of its non-members." —William Temple

Building on our understanding of God's missionary nature, we must now examine what this means for the church itself. If God is missionary by nature, and the church is the people of God, then the church must also be missionary by nature. This principle challenges us to rethink the fundamental identity and purpose of the church.

## From Attractional to Missional

For decades, the dominant church model in North America has been attractional. The primary strategy has been to create compelling worship services, programs, and facilities that would draw people to come to church. While there is nothing inherently wrong with excellence in worship and programming, the attractional model reflects a fundamental misunderstanding of the church's nature and purpose.

The attractional model assumes that the primary movement is centripetal—people coming to us. The missional model recognizes that the primary movement should be centrifugal—the church going to the world.

### The Great Commission Imperative

> "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age." —Matthew 28:19-20

The Great Commission begins with "go" (***poreuomai***), indicating movement and sending. The church is not called to wait for the world to come to us; we are called to go to the world. This represents a fundamental shift in understanding church mission and strategy.

## Ecclesiological Rethinking

To embrace the missionary nature of the church requires significant **ecclesiological** rethinking—reconsidering what we believe about the church itself. Several key areas need attention:

### 1. Purpose vs. Programs

**Traditional Thinking**: The church exists to provide religious services and programs for its members.

**Missional Thinking**: The church exists to participate in God's mission of redeeming and restoring all creation.

This shift moves the church from being a vendor of religious goods and services to being a community of missionaries sent into the world.

### 2. Membership vs. Discipleship

**Traditional Thinking**: Church success is measured by membership growth and attendance numbers.

**Missional Thinking**: Church health is measured by the formation of disciples who live out their faith in every sphere of life.

Discipleship becomes the primary focus, with membership serving discipleship rather than discipleship serving membership.

### 3. Maintenance vs. Mission

**Traditional Thinking**: Church energy is primarily focused on maintaining existing structures, programs, and traditions.

**Missional Thinking**: Church energy is primarily focused on advancing God's mission in the world.

This requires regularly evaluating all church activities through the lens of mission rather than tradition or preference.

## The Sent Church

Understanding the missionary nature of the church means recognizing that every believer is sent. The church is not a gathering of religious consumers; it is a community of missionaries.

### Apostolic Identity

The word "apostle" (***apostolos***) literally means "sent one." While not all believers hold the office of apostle, all believers share in apostolic identity—we are all sent ones. This means:

1. **Every Member is a Missionary** - Mission is not the responsibility of a few specialists but the calling of every believer
2. **Every Context is a Mission Field** - We don't go to the mission field; we are sent into our contexts as mission fields
3. **Every Vocation is Sacred** - All legitimate work becomes a platform for missionary engagement

### The Priesthood of All Believers

Martin Luther's insight about the priesthood of all believers has missionary implications. If every believer is a priest, then every believer is also a missionary. This democratizes mission and makes it the responsibility of the entire church rather than a specialized few.

## Incarnational Presence

The missionary church embodies **incarnational** presence in its community. Just as Jesus incarnated—took on flesh and dwelt among us—the church incarnates the presence of Christ in its local context.

### Contextual Engagement

Incarnational presence requires deep engagement with the local context. This includes:

1. **Cultural Understanding** - Learning the language, customs, and values of the local community
2. **Relationship Building** - Developing authentic friendships with neighbors who don't yet know Christ
3. **Community Service** - Meeting practical needs and working for the common good
4. **Long-term Commitment** - Staying in place long enough to build trust and see transformation

### Being Good News

Before the church can share good news, it must be good news in its community. This means embodying the values of the Kingdom through:

- **Justice** - Advocating for the marginalized and oppressed
- **Mercy** - Showing compassion to those who are suffering  
- **Humility** - Serving others without expecting recognition
- **Peace** - Working for reconciliation and wholeness
- **Hope** - Demonstrating confidence in God's ultimate victory

## Organizational Implications

Recognizing the missionary nature of the church has significant organizational implications:

### Leadership Development

Leaders must be developed as missionaries rather than simply program administrators. This includes:

1. **Missional Competencies** - Skills in cultural analysis, relationship building, and community engagement
2. **Theological Depth** - Understanding of God's mission and the church's role
3. **Spiritual Formation** - Personal transformation that enables missional living

### Resource Allocation

Church budgets and resources should reflect missional priorities:

1. **External Focus** - Significant resources directed toward community engagement and global mission
2. **Leader Development** - Investment in training missionaries rather than just program staff
3. **Facility Usage** - Church buildings used for community benefit, not just internal programming

### Decision Making

All major decisions should be evaluated through a missional lens:

- How does this advance God's mission?
- How does this serve our neighbors?
- How does this form disciples?
- How does this demonstrate the Kingdom?

## Challenges and Obstacles

Transitioning to a missionary understanding of the church faces several challenges:

### Consumer Mentality

Many church members have developed consumer expectations about church services. Moving from consumerism to mission requires significant cultural change and patience.

### Institutional Inertia

Established churches have systems, structures, and traditions that resist missional transformation. Change requires persistent leadership and clear vision.

### Measurement Difficulties

It's easier to count attendance than to measure missionary formation. New metrics and assessment tools are needed to evaluate missional health.

### Leadership Resistance

Some church leaders may resist missional transformation due to fear of conflict, loss of control, or uncertainty about new approaches.

## Biblical Examples

Scripture provides several examples of missional churches:

### The Antioch Church

> "In the church at Antioch there were prophets and teachers: Barnabas, Simeon called Niger, Lucius of Cyrene, Manaen (who had been brought up with Herod the tetrarch) and Saul. While they were worshiping the Lord and fasting, the Holy Spirit said, 'Set apart for me Barnabas and Saul for the work to which I have called them.'" —Acts 13:1-2

The Antioch church demonstrated missional characteristics:
- Diverse leadership reflecting their multicultural context
- Sensitivity to the Holy Spirit's leading
- Willingness to send their best leaders for mission
- Prayer and fasting as foundations for missional activity

### The Thessalonian Church

> "The Lord's message rang out from you not only in Macedonia and Achaia—your faith in God has become known everywhere. Therefore we do not need to say anything about it, for they themselves report what kind of reception you gave us. They tell how you turned to God from idols to serve the living and true God." —1 Thessalonians 1:8-9

The Thessalonian church was known for:
- Proclaiming the gospel throughout their region
- Demonstrating transformed lives
- Creating such impact that Paul didn't need to speak about their faith
- Influencing other communities through their witness

## Moving Forward

Embracing the missionary nature of the church requires:

### 1. Vision Casting
Church leaders must consistently communicate the missional vision and help members understand their missionary identity.

### 2. Cultural Formation
Developing a culture where mission is expected and celebrated rather than optional.

### 3. System Alignment
Restructuring church systems to support and reward missional activity rather than maintenance activities.

### 4. Training and Equipping
Providing practical training to help all members live as missionaries in their daily contexts.

### 5. Patience and Persistence
Recognizing that cultural transformation takes time and requires sustained effort.

The missionary nature of the church is not merely a new program or strategy—it represents a fundamental shift in ecclesiological understanding. When churches embrace their missionary identity, they discover renewed purpose, energy, and effectiveness in fulfilling their calling as the people of God sent into the world.`,
};

// Reading Progress Hook
const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTotal =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollTotal) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
};

// Enhanced MDX Components
const MDXComponents = {
  h1: ({ children, ...props }: any) => (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 leading-tight"
      {...props}
    >
      {children}
    </motion.h1>
  ),
  h2: ({ children, ...props }: any) => (
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mt-12 mb-6 border-l-4 border-blue-500 pl-4"
      {...props}
    >
      {children}
    </motion.h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3
      className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-4"
      {...props}
    >
      {children}
    </h3>
  ),
  blockquote: ({ children, ...props }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass-card bg-gradient-to-r from-blue-50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl shadow-lg"
      {...props}
    >
      <div className="flex items-start gap-4">
        <QuoteIcon className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
        <div className="flex-1 text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic">
          {children}
        </div>
      </div>
    </motion.div>
  ),
  p: ({ children, ...props }: any) => (
    <p
      className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg"
      {...props}
    >
      {children}
    </p>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-bold text-blue-600 dark:text-blue-400" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic text-purple-600 dark:text-purple-400" {...props}>
      {children}
    </em>
  ),
  ul: ({ children, ...props }: any) => (
    <ul
      className="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol
      className="list-decimal list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="ml-4 leading-relaxed" {...props}>
      {children}
    </li>
  ),
};

// Simple MDX Parser (for demonstration - in real app you'd use proper MDX)
const SimpleMDXRenderer = ({ content }: { content: string }) => {
  const renderContent = (text: string) => {
    // Split by lines and process
    const lines = text.trim().split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let inBlockquote = false;
    let blockquoteContent: string[] = [];
    let inList = false;
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' = 'ul';

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ').trim();
        if (paragraphText) {
          elements.push(
            <MDXComponents.p key={`p-${elements.length}`}>
              {processInlineFormatting(paragraphText)}
            </MDXComponents.p>
          );
        }
        currentParagraph = [];
      }
    };

    const flushBlockquote = () => {
      if (blockquoteContent.length > 0) {
        const quoteText = blockquoteContent
          .join(' ')
          .replace(/^>\s*/, '')
          .trim();
        elements.push(
          <MDXComponents.blockquote key={`bq-${elements.length}`}>
            {processInlineFormatting(quoteText)}
          </MDXComponents.blockquote>
        );
        blockquoteContent = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        const ListComponent =
          listType === 'ul' ? MDXComponents.ul : MDXComponents.ol;
        elements.push(
          <ListComponent key={`list-${elements.length}`}>
            {listItems.map((item, index) => (
              <MDXComponents.li key={index}>
                {processInlineFormatting(item)}
              </MDXComponents.li>
            ))}
          </ListComponent>
        );
        listItems = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        if (inBlockquote) {
          flushBlockquote();
          inBlockquote = false;
        } else if (inList) {
          flushList();
          inList = false;
        } else {
          flushParagraph();
        }
        return;
      }

      // Headers
      if (trimmedLine.startsWith('# ')) {
        flushParagraph();
        flushBlockquote();
        flushList();
        inBlockquote = false;
        inList = false;
        elements.push(
          <MDXComponents.h1 key={`h1-${elements.length}`}>
            {trimmedLine.substring(2)}
          </MDXComponents.h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        flushParagraph();
        flushBlockquote();
        flushList();
        inBlockquote = false;
        inList = false;
        elements.push(
          <MDXComponents.h2 key={`h2-${elements.length}`}>
            {trimmedLine.substring(3)}
          </MDXComponents.h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        flushParagraph();
        flushBlockquote();
        flushList();
        inBlockquote = false;
        inList = false;
        elements.push(
          <MDXComponents.h3 key={`h3-${elements.length}`}>
            {trimmedLine.substring(4)}
          </MDXComponents.h3>
        );
      } else if (trimmedLine.startsWith('> ')) {
        flushParagraph();
        flushList();
        inList = false;
        inBlockquote = true;
        blockquoteContent.push(trimmedLine);
      } else if (inBlockquote && trimmedLine.startsWith('>')) {
        blockquoteContent.push(trimmedLine);
      } else if (trimmedLine.match(/^\d+\.\s/)) {
        flushParagraph();
        flushBlockquote();
        inBlockquote = false;
        if (!inList || listType !== 'ol') {
          flushList();
          inList = true;
          listType = 'ol';
        }
        listItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
      } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        flushParagraph();
        flushBlockquote();
        inBlockquote = false;
        if (!inList || listType !== 'ul') {
          flushList();
          inList = true;
          listType = 'ul';
        }
        listItems.push(trimmedLine.substring(2));
      } else {
        if (inBlockquote) {
          flushBlockquote();
          inBlockquote = false;
        }
        if (inList) {
          flushList();
          inList = false;
        }
        currentParagraph.push(trimmedLine);
      }
    });

    // Flush any remaining content
    flushParagraph();
    flushBlockquote();
    flushList();

    return elements;
  };

  const processInlineFormatting = (text: string) => {
    // Process ***italic-bold***, **bold**, and *italic*
    const parts = text.split(/((?:\*{1,3})[^*]+(?:\*{1,3}))/);

    return parts.map((part, index) => {
      if (part.startsWith('***') && part.endsWith('***')) {
        const content = part.slice(3, -3);
        return (
          <em key={index}>
            <strong>{content}</strong>
          </em>
        );
      } else if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        return <strong key={index}>{content}</strong>;
      } else if (part.startsWith('*') && part.endsWith('*')) {
        const content = part.slice(1, -1);
        return <em key={index}>{content}</em>;
      }
      return part;
    });
  };

  return (
    <div className="prose prose-lg max-w-none">{renderContent(content)}</div>
  );
};

export default function EbookExamplePage() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readingMode, setReadingMode] = useState<
    'comfortable' | 'compact' | 'focus'
  >('comfortable');
  const [bookmarkedChapters, setBookmarkedChapters] = useState<Set<number>>(
    new Set()
  );
  const progress = useReadingProgress();

  const currentChapterData = tableOfContents[currentChapter];
  const contentKey = currentChapterData.slug as keyof typeof chapterContents;
  const chapterContent =
    chapterContents[contentKey] || chapterContents['introduction'];

  const nextChapter = () => {
    if (currentChapter < tableOfContents.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const toggleBookmark = (chapterIndex: number) => {
    const newBookmarks = new Set(bookmarkedChapters);
    if (newBookmarks.has(chapterIndex)) {
      newBookmarks.delete(chapterIndex);
    } else {
      newBookmarks.add(chapterIndex);
    }
    setBookmarkedChapters(newBookmarks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={progress} className="h-1 bg-transparent" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-1 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 mt-1">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="glass-card"
              >
                <Menu className="w-4 h-4" />
              </Button>
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="glass-card">
                {currentChapter + 1} / {tableOfContents.length}
              </Badge>
              <Badge variant="outline" className="glass-card">
                <Clock className="w-3 h-3 mr-1" />
                15 min read
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBookmark(currentChapter)}
                className={cn(
                  'glass-card',
                  bookmarkedChapters.has(currentChapter) && 'text-yellow-600'
                )}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="glass-card">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-r border-gray-200/50 dark:border-gray-800/50 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold">Table of Contents</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {tableOfContents.map((chapter: any, index: number) => (
                    <motion.button
                      key={chapter.slug}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setCurrentChapter(index);
                        setSidebarOpen(false);
                      }}
                      className={cn(
                        'w-full text-left p-4 rounded-lg transition-all',
                        index === currentChapter
                          ? 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-900/50'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {chapter.type === 'principle' ? (
                              <Target className="w-4 h-4 text-blue-500" />
                            ) : (
                              <BookOpen className="w-4 h-4 text-purple-500" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {chapter.chapter === 0
                                ? 'Intro'
                                : chapter.chapter}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-sm leading-tight">
                            {chapter.title}
                          </h3>
                        </div>
                        {bookmarkedChapters.has(index) && (
                          <Bookmark className="w-4 h-4 text-yellow-500 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Chapter Header */}
        <motion.div
          key={currentChapter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge
              variant="outline"
              className="glass-card border-blue-200/50 bg-blue-50/80 text-blue-700 dark:border-blue-800/50 dark:bg-blue-950/80 dark:text-blue-300"
            >
              <BookOpen className="w-3 h-3 mr-1" />
              {currentChapterData.type === 'principle'
                ? `Principle ${currentChapterData.chapter}`
                : 'Introduction'}
            </Badge>
            <Badge
              variant="outline"
              className="glass-card border-purple-200/50 bg-purple-50/80 text-purple-700 dark:border-purple-800/50 dark:bg-purple-950/80 dark:text-purple-300"
            >
              <Clock className="w-3 h-3 mr-1" />
              15 min read
            </Badge>
            <Badge
              variant="outline"
              className="glass-card border-green-200/50 bg-green-50/80 text-green-700 dark:border-green-800/50 dark:bg-green-950/80 dark:text-green-300"
            >
              <User className="w-3 h-3 mr-1" />
              Enhanced with MDX
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight mb-8">
            {currentChapterData.title}
          </h1>
        </motion.div>

        {/* Chapter Content */}
        <motion.div
          key={`content-${currentChapter}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn(
            'glass-card p-8 md:p-12 rounded-2xl shadow-2xl',
            readingMode === 'comfortable' && 'text-lg leading-relaxed',
            readingMode === 'compact' && 'text-base leading-normal',
            readingMode === 'focus' && 'text-xl leading-loose'
          )}
        >
          <SimpleMDXRenderer content={chapterContent} />
        </motion.div>

        {/* Chapter Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                <Lightbulb className="w-4 h-4 mr-2" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Discover the foundational concepts that will transform your
                understanding of mission and church.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400">
                <Target className="w-4 h-4 mr-2" />
                Practical Application
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn how to apply these principles in your ministry context and
                community.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Reflection Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Engage with thought-provoking questions that deepen your
                understanding.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-800/50"
        >
          <Button
            onClick={prevChapter}
            disabled={currentChapter === 0}
            variant="outline"
            className="glass-card"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {currentChapter + 1} of {tableOfContents.length}
            </span>
          </div>

          <Button
            onClick={nextChapter}
            disabled={currentChapter === tableOfContents.length - 1}
            variant="outline"
            className="glass-card"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
}

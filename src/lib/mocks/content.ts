import { Principle, Lesson, Activity, Badge } from '@/types/content';

export const mockPrinciples: Principle[] = [
  {
    id: '1',
    slug: 'missionary-nature-of-god',
    title: 'Rethink the Missionary Nature of God',
    summary:
      "Discover how mission begins with God's heart, not human initiative. Explore the Trinity as the ultimate sending community.",
    estMinutes: 35,
    badgeId: 'badge_missio_dei',
  },
  {
    id: '2',
    slug: 'missio-dei',
    title: 'Rethink Missio Dei',
    summary:
      "Understand God's mission as the framework for all Christian life and ministry. We don't bring God to the world—we join God who is already there.",
    estMinutes: 40,
    badgeId: 'badge_missio_dei',
  },
  {
    id: '3',
    slug: 'incarnational-mission',
    title: 'Rethink Incarnational Mission',
    summary:
      'Learn the power of presence before proclamation. Jesus moved into the neighborhood—so should we.',
    estMinutes: 45,
    badgeId: 'badge_incarnation',
  },
  {
    id: '4',
    slug: 'vocation',
    title: 'Rethink Vocation (Whole-Life Mission)',
    summary:
      "Your workplace isn't where you make money to fund ministry—it IS ministry. Discover everyday vocation as mission.",
    estMinutes: 50,
    badgeId: 'badge_vocation',
  },
  {
    id: '5',
    slug: 'multiplication',
    title: 'Rethink Multiplication',
    summary:
      'Move beyond addition to multiplication. Learn to plant seeds that grow into movements, not just ministries.',
    estMinutes: 38,
    badgeId: 'badge_multiplication',
  },
  {
    id: '6',
    slug: 'post-christendom',
    title: 'Rethink Life in a Post-Christendom Context',
    summary:
      'Navigate ministry when Christianity is no longer culturally central. Find freedom in the margins.',
    estMinutes: 42,
    badgeId: 'badge_post_christendom',
  },
  {
    id: '7',
    slug: 'discipleship',
    title: 'Rethink Discipleship as Everyday Apprenticeship',
    summary:
      "Discipleship isn't a program—it's a way of life. Learn to mentor others in ordinary moments.",
    estMinutes: 47,
    badgeId: 'badge_discipleship',
  },
  {
    id: '8',
    slug: 'teams',
    title: 'Rethink Teams on Mission',
    summary:
      'Mission is a team sport. Discover how to build and sustain teams that multiply impact.',
    estMinutes: 41,
    badgeId: 'badge_teams',
  },
  {
    id: '9',
    slug: 'place',
    title: 'Rethink Place, Parish, and Neighborhood',
    summary:
      'Geography matters in mission. Learn to see your place as your parish and your neighborhood as your mission field.',
    estMinutes: 44,
    badgeId: 'badge_place',
  },
  {
    id: '10',
    slug: 'contextualization',
    title: 'Rethink Cultural Distance & Contextualization',
    summary:
      'Bridge cultural gaps with wisdom and humility. Learn to translate the gospel without compromising it.',
    estMinutes: 39,
    badgeId: 'badge_contextualization',
  },
  {
    id: '11',
    slug: 'sending',
    title: 'Rethink Sending & Planting Pathways',
    summary:
      'Explore diverse pathways for church planting and sending in the 21st century.',
    estMinutes: 43,
    badgeId: 'badge_sending',
  },
  {
    id: '12',
    slug: 'metrics',
    title: 'Rethink Kingdom Metrics (Long Haul, Not Quick Fix)',
    summary:
      'Measure what matters in kingdom work. Learn metrics that honor faithfulness over flashiness.',
    estMinutes: 36,
    badgeId: 'badge_metrics',
  },
];

export const mockLessons: Lesson[] = [
  // Incarnational Mission lessons
  {
    id: 'lesson-01',
    principleId: '3',
    title: 'Theology of Incarnation (Presence before Proclamation)',
    order: 1,
    mdxPath: '/content/principles/incarnational-mission/lesson-01.mdx',
    keyTakeaways: [
      'People become receptive after they feel received',
      'Incarnation means proximity and presence, not just proclamation',
      'Mission begins with learning, not teaching',
    ],
  },
  {
    id: 'lesson-02',
    principleId: '3',
    title: 'Practices of Presence',
    order: 2,
    mdxPath: '/content/principles/incarnational-mission/lesson-02.mdx',
    keyTakeaways: [
      'Seek the welfare of your city through consistent presence',
      'Join existing good rather than always starting something new',
      'Incarnational mission requires the long view',
    ],
  },
  // Sample lessons for other principles
  {
    id: 'lesson-vocation-01',
    principleId: '4',
    title: 'Your Work as Worship',
    order: 1,
    mdxPath: '/content/principles/vocation/lesson-01.mdx',
    keyTakeaways: [
      "Every job is a calling when done for God's glory",
      'Workplace relationships are opportunities for incarnational presence',
      'Excellence in work is a form of witness',
    ],
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'reflection-01',
    lessonId: 'lesson-01',
    type: 'REFLECTION',
    order: 1,
    payload: {
      prompt:
        'Where in your weekly rhythm do you need to "move closer"? Consider your neighborhood, workplace, and third places. What would incarnational presence look like in these contexts?',
      minWords: 40,
    },
  },
  {
    id: 'simulation-01',
    lessonId: 'lesson-02',
    type: 'SIMULATION',
    order: 1,
    payload: {
      scenario:
        "You've just moved to a new neighborhood and want to live incarnationally. What's your first move?",
      choices: [
        {
          id: 'choice-a',
          label: 'Start a weekly program at your house',
          rationale:
            'While hosting is generous, starting with your own programming risks importing your preferences before listening to the community. Incarnational presence begins with receiving, not giving.',
          delta: -1,
        },
        {
          id: 'choice-b',
          label: 'Join the local running club or community group',
          rationale:
            "Excellent! You're entering existing community life with a posture of learner. This demonstrates incarnational presence—joining what's already happening rather than creating something new.",
          delta: 1,
        },
        {
          id: 'choice-c',
          label: 'Volunteer at the local school once to "get visibility"',
          rationale:
            "Volunteering shows good intention, but one-time visibility doesn't build the relationships that incarnational mission requires. Presence is about consistency and depth, not exposure.",
          delta: 0,
        },
      ],
    },
  },
  {
    id: 'field-experiment-01',
    lessonId: 'lesson-02',
    type: 'FIELD_EXPERIMENT',
    order: 2,
    payload: {
      title: 'Find Your Third Place',
      instructions:
        'Spend one intentional hour at a café, park, gym, or other "third place" this week. Your goal is simple presence: learn one name, notice one need, and pray a short blessing for the space and its people.',
      suggestedDuration: '1 hour',
      checklist: [
        'Choose a consistent location you can return to regularly',
        'Introduce yourself to at least one person (staff member, regular, etc.)',
        'Observe the rhythms and needs of the space',
        'Pray quietly for the place and its people',
        'Journal about what you noticed and learned',
      ],
    },
  },
];

export const mockBadges: Badge[] = [
  {
    id: 'badge_incarnation',
    name: 'Moved into the Neighborhood',
    description:
      'You embraced incarnational presence—nice. Presence creates possibility.',
    icon: 'home',
    earned: false,
  },
  {
    id: 'badge_vocation',
    name: 'Everyday Missionary',
    description:
      'You discovered your workplace as mission field. Excellence is witness.',
    icon: 'briefcase-heart',
    earned: false,
  },
  {
    id: 'badge_multiplication',
    name: 'Seed Planter',
    description:
      'You planted seeds for multiplication, not just addition. Growth takes time.',
    icon: 'sprout',
    earned: false,
  },
  {
    id: 'badge_teams',
    name: 'Team Builder',
    description:
      'You learned that mission is a team sport. Together we go further.',
    icon: 'users',
    earned: false,
  },
  {
    id: 'badge_place',
    name: 'Parish Priest',
    description:
      'You claimed your place as your parish. Geography matters in mission.',
    icon: 'map-pin',
    earned: false,
  },
  {
    id: 'badge_missio_dei',
    name: 'Missio Dei',
    description:
      "You joined God's mission already in progress. You don't take God anywhere—you go where God is.",
    icon: 'compass',
    earned: false,
  },
];

// Helper functions
export function getPrincipleBySlug(slug: string): Principle | undefined {
  return mockPrinciples.find(p => p.slug === slug);
}

export function getLessonsByPrincipleId(principleId: string): Lesson[] {
  return mockLessons.filter(l => l.principleId === principleId);
}

export function getActivitiesByLessonId(lessonId: string): Activity[] {
  return mockActivities.filter(a => a.lessonId === lessonId);
}

export function getBadgeById(badgeId: string): Badge | undefined {
  return mockBadges.find(b => b.id === badgeId);
}

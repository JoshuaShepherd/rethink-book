import { Quiz, QuizQuestion } from '@/types/content';

// Sample quiz for Incarnational Mission principle
const incarnationalMissionQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'SINGLE_SELECT',
    question: 'What is the best summary of incarnational mission?',
    choices: [
      {
        id: 'q1a',
        label: 'Running more church programs',
        isCorrect: false,
      },
      {
        id: 'q1b',
        label: "Moving gospel toward people's real lives",
        isCorrect: true,
      },
      {
        id: 'q1c',
        label: 'Keeping sacred and secular separate',
        isCorrect: false,
      },
    ],
    hint: 'Think about how Jesus moved into our neighborhood (John 1:14)',
    explanation:
      "Incarnational mission means moving the gospel toward people's real lives, just as Jesus moved into our neighborhood. It's about presence before proclamation.",
    points: 1,
  },
  {
    id: 'q2',
    type: 'SINGLE_SELECT',
    question: 'What is the first faithful move in a new parish?',
    choices: [
      {
        id: 'q2a',
        label: 'Announce events immediately',
        isCorrect: false,
      },
      {
        id: 'q2b',
        label: 'Map places & people, listen, join existing good',
        isCorrect: true,
      },
      {
        id: 'q2c',
        label: 'Avoid public spaces until established',
        isCorrect: false,
      },
    ],
    hint: 'Consider what posture of learning and presence would look like',
    explanation:
      'The first move is to map places and people, listen deeply, and join the existing good. This shows a posture of learning rather than assuming we know what the community needs.',
    points: 1,
  },
  {
    id: 'q3',
    type: 'SINGLE_SELECT',
    question: 'How does Jeremiah 29:4–7 shape our posture in mission?',
    choices: [
      {
        id: 'q3a',
        label: 'It calls us to withdraw from the city',
        isCorrect: false,
      },
      {
        id: 'q3b',
        label:
          "It calls us to seek the city's welfare through settled presence",
        isCorrect: true,
      },
      {
        id: 'q3c',
        label: 'It tells us to focus only on fellow believers',
        isCorrect: false,
      },
    ],
    hint: 'What did God tell the exiles to do in Babylon?',
    explanation:
      'Jeremiah 29:4–7 calls us to seek the welfare of the city through settled presence. We are to plant gardens, build houses, and work for the flourishing of our context.',
    points: 1,
  },
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-incarnational-mission',
    principleId: 'incarnational-mission',
    title: 'Incarnational Mission Mastery Check',
    description:
      'Test your understanding of presence-based mission and incarnational practices.',
    questions: incarnationalMissionQuestions,
    passThreshold: 80,
    timeLimit: 15, // 15 minutes
  },
  {
    id: 'quiz-missio-dei',
    principleId: 'missio-dei',
    title: 'Missio Dei Understanding',
    description: "Explore God's mission and our participation in it.",
    questions: [
      {
        id: 'q1',
        type: 'SINGLE_SELECT',
        question: 'What does missio Dei primarily emphasize?',
        choices: [
          { id: 'a', label: "God's mission in the world", isCorrect: true },
          { id: 'b', label: 'Church growth strategies', isCorrect: false },
          {
            id: 'c',
            label: 'Personal evangelism techniques',
            isCorrect: false,
          },
        ],
        explanation:
          "Missio Dei emphasizes that mission is first God's mission, and we participate in what God is already doing.",
        points: 1,
      },
    ],
    passThreshold: 80,
  },
  {
    id: 'quiz-vocation',
    principleId: 'vocation',
    title: 'Whole-Life Mission Check',
    description: 'Understanding vocation as everyday mission and calling.',
    questions: [
      {
        id: 'q1',
        type: 'SINGLE_SELECT',
        question: 'How should we understand Christian vocation?',
        choices: [
          { id: 'a', label: 'Only for full-time ministry', isCorrect: false },
          { id: 'b', label: 'All of life as mission context', isCorrect: true },
          { id: 'c', label: 'Separate from secular work', isCorrect: false },
        ],
        explanation:
          'Christian vocation encompasses all of life as mission context - every role and relationship is a place of calling.',
        points: 1,
      },
    ],
    passThreshold: 80,
  },
];

export default mockQuizzes;

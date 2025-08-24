'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { track } from '@/lib/analytics';
import {
  BookOpen,
  PlusCircle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Archive,
  ArrowLeft,
  Calendar,
  User,
  FileText,
  HelpCircle,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import type { AdminPrinciple, PrincipleStatus } from '@/types/content';

// Mock data for principles
const mockPrinciples: AdminPrinciple[] = [
  {
    id: 'incarnational-mission',
    slug: 'incarnational-mission',
    title: 'Incarnational Mission',
    summary:
      'Living as sent people in everyday places, embodying the Gospel through presence, word, and deed.',
    estMinutes: 45,
    status: 'PUBLISHED',
    version: 1,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    publishedAt: new Date('2024-01-20'),
    authorId: 'content-team',
    badgeId: 'incarnational-badge',
    versions: [
      {
        id: '1',
        version: 1,
        title: 'Incarnational Mission',
        summary:
          'Living as sent people in everyday places, embodying the Gospel through presence, word, and deed.',
        content: '',
        createdAt: new Date('2024-01-15'),
        createdBy: 'content-team',
      },
    ],
    // Additional admin fields
    description:
      'Living as sent people in everyday places, embodying the Gospel through presence, word, and deed.',
    createdBy: 'Content Team',
    estimatedDuration: 45,
    lessonCount: 3,
    activityCount: 5,
    quizCount: 1,
    tags: ['mission', 'incarnational', 'presence'],
  },
  {
    id: 'vocation',
    slug: 'vocation',
    title: 'Vocation & Calling',
    summary:
      'Understanding how God calls us to serve Him through our work and daily vocations.',
    estMinutes: 35,
    status: 'DRAFT',
    version: 1,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
    authorId: 'content-team',
    versions: [
      {
        id: '1',
        version: 1,
        title: 'Vocation & Calling',
        summary:
          'Understanding how God calls us to serve Him through our work and daily vocations.',
        content: '',
        createdAt: new Date('2024-02-01'),
        createdBy: 'content-team',
      },
    ],
    // Additional admin fields
    description:
      'Understanding how God calls us to serve Him through our work and daily vocations.',
    createdBy: 'Content Team',
    estimatedDuration: 35,
    lessonCount: 2,
    activityCount: 4,
    quizCount: 0,
    tags: ['vocation', 'calling', 'work'],
  },
  {
    id: 'missio-dei',
    slug: 'missio-dei',
    title: 'Missio Dei',
    summary:
      "Exploring God's mission and how we participate in His ongoing work in the world.",
    estMinutes: 60,
    status: 'DRAFT',
    version: 2,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-10'),
    authorId: 'content-team',
    versions: [
      {
        id: '1',
        version: 1,
        title: 'Missio Dei',
        summary:
          "Exploring God's mission and how we participate in His ongoing work in the world.",
        content: '',
        createdAt: new Date('2024-01-10'),
        createdBy: 'content-team',
      },
      {
        id: '2',
        version: 2,
        title: 'Missio Dei',
        summary:
          "Exploring God's mission and how we participate in His ongoing work in the world.",
        content: '',
        createdAt: new Date('2024-02-10'),
        createdBy: 'content-team',
      },
    ],
    // Additional admin fields
    description:
      "Exploring God's mission and how we participate in His ongoing work in the world.",
    createdBy: 'Content Team',
    estimatedDuration: 60,
    lessonCount: 4,
    activityCount: 6,
    quizCount: 2,
    tags: ['missio-dei', 'theology', 'mission'],
  },
];

const statusColors: Record<PrincipleStatus, string> = {
  DRAFT:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  PUBLISHED:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  ARCHIVED: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

const statusIcons: Record<PrincipleStatus, React.ReactNode> = {
  DRAFT: <Clock className="h-3 w-3" />,
  PUBLISHED: <CheckCircle className="h-3 w-3" />,
  ARCHIVED: <Archive className="h-3 w-3" />,
};

export default function PrinciplesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<PrincipleStatus | 'ALL'>(
    'ALL'
  );
  const [principles] = useState<AdminPrinciple[]>(mockPrinciples);

  // Filter principles based on search and status
  const filteredPrinciples = principles.filter(principle => {
    const matchesSearch =
      principle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (principle.summary &&
        principle.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (principle.description &&
        principle.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (principle.tags &&
        principle.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    const matchesStatus =
      selectedStatus === 'ALL' || principle.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleCreateNew = () => {
    track('admin_principle_create', { source: 'principles_page' });
    router.push('/admin/principles/new');
  };

  const handleEdit = (principleId: string) => {
    track('admin_principle_edit', { principleId });
    router.push(`/admin/principles/${principleId}/edit`);
  };

  const handlePreview = (principleId: string) => {
    track('admin_principle_preview', { principleId });
    router.push(`/principles/${principleId}`);
  };

  const handleDuplicate = (principleId: string) => {
    track('admin_principle_duplicate', { principleId });
    // In real app, would duplicate the principle
    console.log('Duplicating principle:', principleId);
  };

  const handleArchive = (principleId: string) => {
    track('admin_principle_archive', { principleId });
    // In real app, would archive the principle
    console.log('Archiving principle:', principleId);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusCounts = () => {
    return {
      all: principles.length,
      published: principles.filter(p => p.status === 'PUBLISHED').length,
      draft: principles.filter(p => p.status === 'DRAFT').length,
      archived: principles.filter(p => p.status === 'ARCHIVED').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-300 dark:border-gray-700 bg-surface/50">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            <h1 className="text-lg font-semibold text-text-primary">
              Principles
            </h1>
          </div>

          <div className="ml-auto">
            <Button onClick={handleCreateNew}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Principle
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-muted">Total</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {statusCounts.all}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-text-muted" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-muted">Published</p>
                    <p className="text-2xl font-bold text-green-600">
                      {statusCounts.published}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-muted">Drafts</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {statusCounts.draft}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-muted">Archived</p>
                    <p className="text-2xl font-bold text-gray-600">
                      {statusCounts.archived}
                    </p>
                  </div>
                  <Archive className="h-8 w-8 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input
                placeholder="Search principles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {selectedStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedStatus('ALL')}>
                  All ({statusCounts.all})
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedStatus('PUBLISHED')}
                >
                  Published ({statusCounts.published})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus('DRAFT')}>
                  Draft ({statusCounts.draft})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus('ARCHIVED')}>
                  Archived ({statusCounts.archived})
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Principles List */}
          <div className="space-y-4">
            {filteredPrinciples.map(principle => (
              <Card
                key={principle.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-text-primary">
                              {principle.title}
                            </h3>
                            <Badge
                              className={`${statusColors[principle.status]} flex items-center gap-1`}
                            >
                              {statusIcons[principle.status]}
                              {principle.status}
                            </Badge>
                            {principle.version > 1 && (
                              <Badge variant="outline" className="text-xs">
                                v{principle.version}
                              </Badge>
                            )}
                          </div>
                          <p className="text-text-secondary text-sm">
                            {principle.description || principle.summary}
                          </p>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(principle.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handlePreview(principle.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDuplicate(principle.id)}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleArchive(principle.id)}
                              className="text-red-600"
                            >
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Content Stats */}
                      <div className="flex items-center space-x-6 text-sm text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{principle.lessonCount || 0} lessons</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{principle.activityCount || 0} activities</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <HelpCircle className="h-4 w-4" />
                          <span>{principle.quizCount || 0} quizzes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {principle.estimatedDuration ||
                              principle.estMinutes}{' '}
                            min
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      {principle.tags && principle.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {principle.tags.map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{principle.createdBy || 'Unknown'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              Created {formatDate(principle.createdAt)}
                            </span>
                          </div>
                          {principle.updatedAt.getTime() !==
                            principle.createdAt.getTime() && (
                            <span>
                              • Updated {formatDate(principle.updatedAt)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreview(principle.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleEdit(principle.id)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredPrinciples.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {searchQuery || selectedStatus !== 'ALL'
                    ? 'No principles found'
                    : 'No principles yet'}
                </h3>
                <p className="text-text-secondary mb-4">
                  {searchQuery || selectedStatus !== 'ALL'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Create your first principle to get started with content creation.'}
                </p>
                {!searchQuery && selectedStatus === 'ALL' && (
                  <Button onClick={handleCreateNew}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create First Principle
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

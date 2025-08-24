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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { track } from '@/lib/analytics';
import {
  ArrowLeft,
  Save,
  Eye,
  Send,
  Trash2,
  Plus,
  GripVertical,
  BookOpen,
  FileText,
  Activity,
  HelpCircle,
  Settings,
  Calendar,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  X,
} from 'lucide-react';
import type {
  AdminPrinciple,
  PrincipleStatus,
  AutoSaveStatus,
} from '@/types/content';

// This would be dynamic based on route params in real app
const PRINCIPLE_ID = 'new';

const initialPrinciple: Partial<AdminPrinciple> = {
  id: '',
  slug: '',
  title: '',
  summary: '',
  description: '',
  status: 'DRAFT',
  estMinutes: 30,
  tags: [],
  lessonCount: 0,
  activityCount: 0,
  quizCount: 0,
  createdBy: 'Current User',
};

const availableTags = [
  'mission',
  'incarnational',
  'presence',
  'vocation',
  'calling',
  'work',
  'missio-dei',
  'theology',
  'community',
  'discipleship',
  'evangelism',
  'kingdom',
  'church-planting',
  'leadership',
  'mentoring',
  'pastoral-care',
];

export default function PrincipleBuilderPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'lessons' | 'activities' | 'quiz' | 'publish'
  >('overview');
  const [principle, setPrinciple] =
    useState<Partial<AdminPrinciple>>(initialPrinciple);
  const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>('IDLE');
  const [validation, setValidation] = useState<{
    isValid: boolean;
    errors: string[];
  }>({
    isValid: true,
    errors: [],
  });
  const [tagInput, setTagInput] = useState('');

  const isNew = PRINCIPLE_ID === 'new';

  // Auto-save simulation
  const triggerAutoSave = () => {
    setAutoSaveStatus('SAVING');
    setTimeout(() => {
      setAutoSaveStatus('SAVED');
      setTimeout(() => setAutoSaveStatus('IDLE'), 2000);
    }, 1000);
  };

  const handleFieldChange = (field: keyof AdminPrinciple, value: any) => {
    setPrinciple(prev => ({ ...prev, [field]: value }));
    // Trigger validation
    validatePrinciple({ ...principle, [field]: value });
    triggerAutoSave();
  };

  const validatePrinciple = (data: Partial<AdminPrinciple>) => {
    const errors: string[] = [];

    if (!data.title?.trim()) {
      errors.push('Title is required');
    }
    if (!data.summary?.trim()) {
      errors.push('Summary is required');
    }
    if (!data.estMinutes || data.estMinutes < 5) {
      errors.push('Estimated duration must be at least 5 minutes');
    }

    setValidation({
      isValid: errors.length === 0,
      errors,
    });
  };

  const handleSaveDraft = () => {
    track('admin_principle_edit', {
      principleId: principle.id || 'new',
      tab: activeTab,
    });
    // In real app, would save to backend
    console.log('Saving draft:', principle);
    triggerAutoSave();
  };

  const handlePreview = () => {
    track('admin_principle_preview', {
      principleId: principle.id || 'new',
    });
    // In real app, would open preview
    console.log('Opening preview for:', principle);
  };

  const handlePublish = () => {
    if (!validation.isValid) return;

    track('admin_publish_success', {
      principleId: principle.id || 'new',
    });
    // In real app, would publish principle
    console.log('Publishing:', principle);
    router.push('/admin/principles');
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !principle.tags?.includes(tagInput.trim())) {
      const newTags = [...(principle.tags || []), tagInput.trim()];
      handleFieldChange('tags', newTags);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = (principle.tags || []).filter(tag => tag !== tagToRemove);
    handleFieldChange('tags', newTags);
  };

  const getAutoSaveIcon = () => {
    switch (autoSaveStatus) {
      case 'SAVING':
        return <Clock className="h-4 w-4 animate-spin text-orange-500" />;
      case 'SAVED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'ERROR':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    {
      id: 'lessons',
      label: 'Lessons',
      icon: FileText,
      count: principle.lessonCount,
    },
    {
      id: 'activities',
      label: 'Activities',
      icon: Activity,
      count: principle.activityCount,
    },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, count: principle.quizCount },
    { id: 'publish', label: 'Publish', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-300 dark:border-gray-700 bg-surface/50">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/principles"
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Principles</span>
            </Link>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold text-text-primary">
                {isNew ? 'Create New Principle' : `Edit: ${principle.title}`}
              </h1>
              <Badge
                variant={
                  principle.status === 'PUBLISHED' ? 'default' : 'secondary'
                }
              >
                {principle.status}
              </Badge>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-2">
            {/* Auto-save status */}
            <div className="flex items-center space-x-2 text-sm text-text-muted">
              {getAutoSaveIcon()}
              <span>
                {autoSaveStatus === 'SAVING' && 'Saving...'}
                {autoSaveStatus === 'SAVED' && 'Saved'}
                {autoSaveStatus === 'ERROR' && 'Save failed'}
              </span>
            </div>

            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>

            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>

            <Button
              onClick={handlePublish}
              disabled={!validation.isValid || principle.status === 'PUBLISHED'}
            >
              <Send className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Tab Navigation */}
        <nav className="w-64 border-r border-gray-300 dark:border-gray-700 bg-surface/30 min-h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{tab.label}</span>
                  {'count' in tab && typeof tab.count === 'number' && (
                    <Badge variant="outline" className="text-xs">
                      {tab.count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>

          {/* Validation Summary */}
          {!validation.isValid && (
            <div className="p-4 border-t border-gray-300 dark:border-gray-700">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Issues Found</span>
                </div>
                <ul className="space-y-1 text-xs text-red-600">
                  {validation.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Essential details about this principle
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-text-primary block mb-2">
                        Title *
                      </label>
                      <Input
                        placeholder="e.g., Incarnational Mission"
                        value={principle.title || ''}
                        onChange={e =>
                          handleFieldChange('title', e.target.value)
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-text-primary block mb-2">
                        Summary *
                      </label>
                      <textarea
                        placeholder="Brief summary of this principle..."
                        value={principle.summary || ''}
                        onChange={e =>
                          handleFieldChange('summary', e.target.value)
                        }
                        className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-text-primary block mb-2">
                        Description
                      </label>
                      <textarea
                        placeholder="Detailed description for admin use..."
                        value={principle.description || ''}
                        onChange={e =>
                          handleFieldChange('description', e.target.value)
                        }
                        className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-text-primary block mb-2">
                          Estimated Duration (minutes) *
                        </label>
                        <Input
                          type="number"
                          min="5"
                          placeholder="30"
                          value={principle.estMinutes || ''}
                          onChange={e =>
                            handleFieldChange(
                              'estMinutes',
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-text-primary block mb-2">
                          Slug
                        </label>
                        <Input
                          placeholder="incarnational-mission"
                          value={principle.slug || ''}
                          onChange={e =>
                            handleFieldChange('slug', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                    <CardDescription>
                      Add tags to help categorize and search for this principle
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button onClick={handleAddTag} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Current Tags */}
                    <div className="flex flex-wrap gap-2">
                      {(principle.tags || []).map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    {/* Suggested Tags */}
                    <div>
                      <p className="text-sm text-text-muted mb-2">
                        Suggested tags:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {availableTags
                          .filter(tag => !(principle.tags || []).includes(tag))
                          .slice(0, 8)
                          .map(tag => (
                            <button
                              key={tag}
                              onClick={() => {
                                const newTags = [
                                  ...(principle.tags || []),
                                  tag,
                                ];
                                handleFieldChange('tags', newTags);
                              }}
                              className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-700 rounded text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'lessons' && (
              <Card>
                <CardHeader>
                  <CardTitle>Lessons</CardTitle>
                  <CardDescription>
                    Create and manage lessons for this principle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      No lessons yet
                    </h3>
                    <p className="text-text-secondary mb-4">
                      Lessons will provide the core content for learners to
                      understand this principle.
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Lesson
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'activities' && (
              <Card>
                <CardHeader>
                  <CardTitle>Activities</CardTitle>
                  <CardDescription>
                    Interactive activities to help learners apply this principle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Activity className="h-12 w-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      No activities yet
                    </h3>
                    <p className="text-text-secondary mb-4">
                      Activities help learners practice and apply what they've
                      learned.
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'quiz' && (
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Quiz</CardTitle>
                  <CardDescription>
                    Create a quiz to test understanding of this principle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      No quiz yet
                    </h3>
                    <p className="text-text-secondary mb-4">
                      A quiz helps validate learner understanding and provides a
                      sense of completion.
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'publish' && (
              <Card>
                <CardHeader>
                  <CardTitle>Publish Settings</CardTitle>
                  <CardDescription>
                    Review and publish this principle
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Validation Check */}
                  <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
                    <h3 className="font-semibold text-text-primary mb-3 flex items-center">
                      {validation.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      Content Validation
                    </h3>

                    {validation.isValid ? (
                      <p className="text-green-600 text-sm">
                        All required fields are complete. Ready to publish!
                      </p>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-red-600 text-sm">
                          Please fix the following issues before publishing:
                        </p>
                        <ul className="text-red-600 text-sm space-y-1 ml-4">
                          {validation.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Content Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-text-muted">
                          Title
                        </label>
                        <p className="text-text-primary">
                          {principle.title || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-muted">
                          Duration
                        </label>
                        <p className="text-text-primary">
                          {principle.estMinutes || 0} minutes
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-muted">
                          Tags
                        </label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(principle.tags || []).map(tag => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {(!principle.tags || principle.tags.length === 0) && (
                            <span className="text-text-muted text-sm">
                              None
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-text-muted">
                          Content
                        </label>
                        <div className="space-y-1 text-sm">
                          <p className="text-text-primary">
                            {principle.lessonCount || 0} lessons
                          </p>
                          <p className="text-text-primary">
                            {principle.activityCount || 0} activities
                          </p>
                          <p className="text-text-primary">
                            {principle.quizCount || 0} quiz
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Publish Button */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Button
                      onClick={handlePublish}
                      disabled={
                        !validation.isValid || principle.status === 'PUBLISHED'
                      }
                      className="w-full"
                      size="lg"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {principle.status === 'PUBLISHED'
                        ? 'Already Published'
                        : 'Publish Principle'}
                    </Button>
                    <p className="text-xs text-text-muted text-center mt-2">
                      Publishing will make this principle available to all
                      learners
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

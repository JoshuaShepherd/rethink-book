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
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import {
  BookOpen,
  PlusCircle,
  Settings,
  Users,
  FileText,
  HelpCircle,
  BarChart3,
  Search,
  Bell,
} from 'lucide-react';

// Mock user for admin (in real app, this would come from auth)
const mockAdminUser = {
  name: 'Content Admin',
  email: 'admin@rethinkbook.com',
  role: 'admin',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock stats
  const stats = {
    totalPrinciples: 3,
    publishedPrinciples: 1,
    draftPrinciples: 2,
    totalLessons: 8,
    totalActivities: 15,
    totalQuizzes: 3,
    activeUsers: 247,
    completionRate: 78,
  };

  const handleCreatePrinciple = () => {
    track('admin_principle_create', {
      source: 'dashboard',
    });
    router.push('/admin/principles/new');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-300 dark:border-gray-700 bg-surface/50">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-text-primary">
                Rethink
              </span>
            </Link>
            <Badge variant="outline" className="text-xs">
              Admin CMS
            </Badge>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="h-9 w-64 rounded-lg border border-gray-300 dark:border-gray-700 bg-background pl-9 pr-3 text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>

            {/* User */}
            <div className="flex items-center space-x-2 text-sm">
              <div className="text-right">
                <div className="font-medium text-text-primary">
                  {mockAdminUser.name}
                </div>
                <div className="text-xs text-text-muted">
                  {mockAdminUser.role}
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {mockAdminUser.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 border-r border-gray-300 dark:border-gray-700 bg-surface/30 min-h-[calc(100vh-4rem)]">
          <div className="p-6 space-y-8">
            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Quick Actions
              </h3>
              <Button
                onClick={handleCreatePrinciple}
                className="w-full justify-start"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Principle
              </Button>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Content
              </h3>
              <div className="space-y-1">
                <Link
                  href="/admin/principles"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Principles</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {stats.totalPrinciples}
                  </Badge>
                </Link>

                <Link
                  href="/admin/lessons"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Lessons</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {stats.totalLessons}
                  </Badge>
                </Link>

                <Link
                  href="/admin/activities"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Activities</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {stats.totalActivities}
                  </Badge>
                </Link>

                <Link
                  href="/admin/quizzes"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Quizzes</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {stats.totalQuizzes}
                  </Badge>
                </Link>

                <Link
                  href="/admin/cohorts"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>Cohorts</span>
                </Link>
              </div>
            </div>

            {/* Analytics */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Analytics
              </h3>
              <Link
                href="/admin/analytics"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Reports</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Content Management
              </h1>
              <p className="text-text-secondary">
                Create, manage, and publish learning modules with incarnational
                mission principles.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">
                        Total Principles
                      </p>
                      <p className="text-2xl font-bold text-text-primary">
                        {stats.totalPrinciples}
                      </p>
                    </div>
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {stats.publishedPrinciples} published
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Active Users</p>
                      <p className="text-2xl font-bold text-text-primary">
                        {stats.activeUsers}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs text-green-600">
                      +12% this month
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Completion Rate</p>
                      <p className="text-2xl font-bold text-text-primary">
                        {stats.completionRate}%
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-accent-gold" />
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      Above average
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Draft Content</p>
                      <p className="text-2xl font-bold text-text-primary">
                        {stats.draftPrinciples}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-text-muted" />
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      Needs review
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks to manage your content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={handleCreatePrinciple}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Principle
                  </Button>

                  <Link href="/admin/principles" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Manage Existing Principles
                    </Button>
                  </Link>

                  <Link href="/admin/analytics" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest changes to your content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-text-primary">
                          Incarnational Mission principle published
                        </p>
                        <p className="text-xs text-text-muted">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-text-primary">
                          Vocation principle created as draft
                        </p>
                        <p className="text-xs text-text-muted">1 day ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-text-primary">
                          Quiz updated for Missio Dei
                        </p>
                        <p className="text-xs text-text-muted">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Getting Started Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with Content Creation</CardTitle>
                <CardDescription>
                  Follow these steps to create compelling learning experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h3 className="font-semibold text-text-primary">
                      Create Principle
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Start with a principle overview that captures the essence
                      of incarnational mission.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <span className="text-secondary font-bold">2</span>
                    </div>
                    <h3 className="font-semibold text-text-primary">
                      Add Content
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Build lessons, activities, and quizzes that help pastors
                      rethink their approach.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-accent-gold/10 rounded-full flex items-center justify-center">
                      <span className="text-accent-gold font-bold">3</span>
                    </div>
                    <h3 className="font-semibold text-text-primary">
                      Publish & Monitor
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Validate your content, publish it, and track how learners
                      engage with it.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

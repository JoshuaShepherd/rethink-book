// Analytics helper for tracking user interactions
// This is a stub implementation - replace with your analytics provider

export type AnalyticsEvent =
  | 'lesson_view'
  | 'reflection_save'
  | 'simulation_choice'
  | 'field_submit'
  | 'lesson_mark_complete'
  | 'scripture_open'
  | 'quiz_start'
  | 'quiz_answer'
  | 'quiz_pass'
  | 'badge_earned'
  | 'streak_increment'
  | 'quiz_view'
  | 'quiz_complete'
  | 'quiz_retake'
  | 'quiz_review_lessons'
  | 'quiz_next_module'
  | 'badge_share'
  | 'badge_modal_continue'
  | 'journal_create'
  | 'journal_edit'
  | 'journal_filter'
  | 'post_create'
  | 'comment_create'
  | 'post_pin'
  | 'post_highlight'
  | 'admin_principle_create'
  | 'admin_principle_edit'
  | 'admin_principle_preview'
  | 'admin_principle_duplicate'
  | 'admin_principle_archive'
  | 'admin_lesson_add'
  | 'admin_activity_add'
  | 'admin_quiz_add'
  | 'admin_publish_success';

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  properties?: Record<string, any>;
  timestamp?: Date;
}

class Analytics {
  private enabled: boolean = true;

  track(event: AnalyticsEvent, properties?: Record<string, any>): void {
    if (!this.enabled) return;

    const eventData: AnalyticsEventData = {
      event,
      properties: {
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent:
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        ...properties,
      },
      timestamp: new Date(),
    };

    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Analytics Event:', eventData);
    }

    // TODO: Replace with your analytics provider
    // Examples:
    // - Google Analytics: gtag('event', event, properties)
    // - Mixpanel: mixpanel.track(event, properties)
    // - PostHog: posthog.capture(event, properties)
    // - Custom API: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(eventData) })
  }

  // Helper methods for common events
  trackLessonView(principleSlug: string, lessonId: string): void {
    this.track('lesson_view', {
      principleSlug,
      lessonId,
      component: 'ModulePlayer',
    });
  }

  trackReflectionSave(reflectionId: string, wordCount: number): void {
    this.track('reflection_save', {
      reflectionId,
      wordCount,
      component: 'ReflectionPrompt',
    });
  }

  trackSimulationChoice(
    simulationId: string,
    choiceId: string,
    delta: number
  ): void {
    this.track('simulation_choice', {
      simulationId,
      choiceId,
      delta,
      component: 'SimulationChoice',
    });
  }

  trackFieldExperimentSubmit(experimentId: string): void {
    this.track('field_submit', {
      experimentId,
      component: 'FieldExperimentCard',
    });
  }

  trackLessonComplete(principleSlug: string, lessonId: string): void {
    this.track('lesson_mark_complete', {
      principleSlug,
      lessonId,
      component: 'ProgressSummary',
    });
  }

  trackScriptureOpen(reference: string): void {
    this.track('scripture_open', {
      reference,
      component: 'Scripture',
    });
  }

  // Disable analytics (useful for testing or privacy)
  disable(): void {
    this.enabled = false;
  }

  // Enable analytics
  enable(): void {
    this.enabled = true;
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Export convenience function
export const track = (
  event: AnalyticsEvent,
  properties?: Record<string, any>
) => {
  analytics.track(event, properties);
};

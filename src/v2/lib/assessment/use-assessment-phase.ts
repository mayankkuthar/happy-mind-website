import { useQuery } from "@tanstack/react-query";
import { startAssessment, checkIfAny, assessmentStatus, getAllReports, getProgress } from "./api";
import { auth } from "@/v2/lib/auth";
import type { HappiLifeProgress } from "./types";

export type AssessmentPhase = "not-started" | "in-progress" | "completed";

export interface AssessmentPhaseData {
  phase: AssessmentPhase;
  progressPercent: number;
  answered: number;
  total: number;
  hasCompletedBefore: boolean;
  /**
   * True if the user has EVER finished at least one attempt, sourced from
   * get-all-report (a real list of completed attempts) rather than
   * checkifany/assessment-status, which only reflect the *latest* attempt —
   * those flip back to "not completed" as soon as a new attempt is started,
   * which is not what "should I show View Report" should mean once retakes
   * are allowed.
   */
  hasAnyCompletedReport: boolean;
  /**
   * The unfinished attempt with at least one saved answer, if any — also set
   * when an earlier attempt was completed and a retake is part-way through.
   * Progress is stored on the server, so it's the same on website and app.
   */
  unfinished: HappiLifeProgress | null;
  /** True once the backend's own attempt cap (currently 6) has been hit */
  maxAttemptsReached: boolean;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function useAssessmentPhase(): AssessmentPhaseData {
  const token = auth.get()?.token;

  // Query 1: Check if user has completed any assessment before
  const checkQuery = useQuery({
    queryKey: ["assessment", "checkifany"],
    queryFn: checkIfAny,
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: 1,
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  // Query 2: Read-only progress of the unfinished attempt. This replaces the
  // old trick of calling start-assessment from every page that renders the
  // header — start-assessment is "start OR resume", so that call could open
  // an attempt just by visiting the dashboard.
  const progressQuery = useQuery({
    queryKey: ["assessment", "progress"],
    queryFn: getProgress,
    staleTime: 1000 * 30,
    // A failure here almost always means an older backend without the
    // endpoint; fall back to start-assessment below instead of retrying.
    retry: false,
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  // Fallback for backends without happilife-progress. Shares the exact query
  // key with the in-progress flow (assessment.tsx InProgressFlow) so React
  // Query dedupes it instead of firing a fresh "resume" call per page.
  const startQuery = useQuery({
    queryKey: ["assessment", "current-page"],
    // Status read only: never ask for a new attempt from here
    queryFn: () => startAssessment(),
    staleTime: 1000 * 30, // 30 seconds
    retry: 1,
    enabled: !!token && progressQuery.isError,
    refetchOnWindowFocus: false,
  });

  // Query 3: Assessment completion status
  const statusQuery = useQuery({
    queryKey: ["assessment", "status"],
    queryFn: assessmentStatus,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  // Query 4: All completed reports — the authoritative "has ever completed" signal
  const reportsQuery = useQuery({
    queryKey: ["assessment", "all-reports"],
    queryFn: getAllReports,
    staleTime: 1000 * 30,
    retry: 1,
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  const usingFallback = progressQuery.isError;
  const isLoading =
    checkQuery.isLoading ||
    statusQuery.isLoading ||
    (usingFallback ? startQuery.isLoading : progressQuery.isLoading);
  const isError = checkQuery.isError && (usingFallback ? startQuery.isError : progressQuery.isError);

  const checkMessage = checkQuery.data?.message ?? checkQuery.data?.data;
  const reportsRaw = reportsQuery.data as { data?: unknown } | undefined;
  const reportsListLength =
    Array.isArray(reportsRaw?.data)
      ? reportsRaw.data.length
      : Array.isArray(reportsQuery.data)
      ? (reportsQuery.data as unknown[]).length
      : 0;

  const hasCompletedBefore =
    checkMessage === "Yes" || statusQuery.data?.completed === true;
  const hasAnyCompletedReport =
    reportsListLength > 0 || hasCompletedBefore ||
    (progressQuery.data?.completed_count ?? 0) > 0;

  // ── Unfinished attempt, from whichever source answered ──────────────────
  let attempt: HappiLifeProgress | null = null;
  if (!usingFallback) {
    attempt = progressQuery.data?.in_progress ? progressQuery.data.progress : null;
  } else {
    const overview = startQuery.data?.overview; // top-level, not under 'data'
    if (overview && overview.total > 0 && overview.answered < overview.total) {
      attempt = {
        assessment_id: overview.assessment_id ?? 0,
        answered: overview.answered,
        total: overview.total,
        percent: overview.progress_percent ??
          Math.min(99, Math.floor((overview.answered / overview.total) * 100)),
        remaining: overview.remaining ?? overview.total - overview.answered,
        started_at: overview.started_at ?? null,
        last_answered_at: overview.last_answered_at ?? null,
        last_activity_at: overview.last_answered_at ?? overview.started_at ?? null,
        completed: false,
      };
    }
  }
  const unfinished = attempt && attempt.answered > 0 ? attempt : null;

  const maxAttemptsReached = usingFallback
    ? Boolean(startQuery.data?.max_attempts_reached || startQuery.data?.status === "true")
    : Boolean(progressQuery.data?.max_attempts_reached);
  const answered = attempt?.answered ?? 0;
  const total = attempt?.total ?? 0;

  let phase: AssessmentPhase = "not-started";
  let progressPercent = 0;

  if (hasAnyCompletedReport || maxAttemptsReached) {
    phase = "completed";
    progressPercent = 100;
  } else if (unfinished) {
    phase = "in-progress";
    progressPercent = Math.min(99, Math.max(1, unfinished.percent));
  }

  const refetch = () => {
    checkQuery.refetch();
    if (usingFallback) startQuery.refetch();
    else progressQuery.refetch();
    statusQuery.refetch();
    reportsQuery.refetch();
  };

  return {
    phase,
    progressPercent,
    answered,
    total,
    hasCompletedBefore,
    hasAnyCompletedReport,
    unfinished,
    maxAttemptsReached,
    isLoading,
    isError,
    refetch,
  };
}

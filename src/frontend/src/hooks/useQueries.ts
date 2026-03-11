import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

// ─── Query: Get My Progress ──────────────────────────────────────
export function useMyProgress() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity;

  return useQuery({
    queryKey: ["myProgress"],
    queryFn: async () => {
      if (!actor || !isLoggedIn) return null;
      return actor.getMyProgress();
    },
    enabled: !!actor && !isFetching && isLoggedIn,
  });
}

// ─── Query: Get Completion Stats ─────────────────────────────────
export function useCompletionStats() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity;

  return useQuery({
    queryKey: ["completionStats"],
    queryFn: async () => {
      if (!actor || !isLoggedIn) return null;
      return actor.getCompletionStats();
    },
    enabled: !!actor && !isFetching && isLoggedIn,
  });
}

// ─── Mutation: Mark Lesson Read ───────────────────────────────────
export function useMarkLessonRead() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lessonId: string) => {
      if (!actor || !identity) return;
      await actor.markLessonRead(lessonId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProgress"] });
    },
  });
}

// ─── Mutation: Mark Simulation Done ─────────────────────────────
export function useMarkSimulationDone() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (simulationId: string) => {
      if (!actor || !identity) return;
      await actor.markSimulationDone(simulationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProgress"] });
    },
  });
}

// ─── Mutation: Submit Quiz ────────────────────────────────────────
export function useSubmitQuiz() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quizId,
      score,
      passed,
    }: {
      quizId: string;
      score: number;
      passed: boolean;
    }) => {
      if (!actor || !identity) return;
      await actor.submitQuiz(quizId, BigInt(score), passed);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProgress"] });
    },
  });
}

// ─── Mutation: Mark Module Complete ─────────────────────────────
export function useMarkModuleComplete() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleId: string) => {
      if (!actor || !identity) return;
      await actor.markModuleComplete(moduleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProgress"] });
      queryClient.invalidateQueries({ queryKey: ["completionStats"] });
    },
  });
}

// ─── Mutation: Mark Domain Complete ─────────────────────────────
export function useMarkDomainComplete() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (domainId: string) => {
      if (!actor || !identity) return;
      await actor.markDomainComplete(domainId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProgress"] });
      queryClient.invalidateQueries({ queryKey: ["completionStats"] });
    },
  });
}

// ─── Query: Get Time Breakdown ────────────────────────────────────
export function useTimeBreakdown() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity;

  return useQuery({
    queryKey: ["timeBreakdown"],
    queryFn: async () => {
      if (!actor || !isLoggedIn) return null;
      return actor.getTimeBreakdown();
    },
    enabled: !!actor && !isFetching && isLoggedIn,
  });
}

// ─── Query: Get Streak Stats ──────────────────────────────────────
export function useStreakStats() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity;

  return useQuery({
    queryKey: ["streakStats"],
    queryFn: async () => {
      if (!actor || !isLoggedIn) return null;
      return actor.getMyStreakStats();
    },
    enabled: !!actor && !isFetching && isLoggedIn,
  });
}

// ─── Mutation: Record Time Spent ──────────────────────────────────
export function useRecordTimeSpent() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      domain,
      seconds,
    }: {
      domain: string;
      seconds: number;
    }) => {
      if (!actor || !identity) return;
      await actor.recordTimeSpent(domain, BigInt(seconds));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeBreakdown"] });
    },
  });
}

// ─── Mutation: Update Streak ──────────────────────────────────────
export function useUpdateStreak() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor || !identity) return;
      const dayNumber = Math.floor(Date.now() / 86400000);
      await actor.updateStreakStats(BigInt(dayNumber));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streakStats"] });
    },
  });
}

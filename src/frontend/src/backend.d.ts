import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TimeBreakdown {
    totalTime: bigint;
    perDomain: Array<TimeStats>;
}
export interface StreakStats {
    today: bigint;
    longestStreak: bigint;
    currentStreak: bigint;
}
export interface TimeStats {
    domain: string;
    seconds: bigint;
}
export interface QuizResult {
    score: bigint;
    quizId: string;
    passed: boolean;
}
export interface UserProgress {
    completedModules: Array<string>;
    completedSimulations: Array<string>;
    completedDomains: Array<string>;
    readLessons: Array<string>;
    quizResults: Array<QuizResult>;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCompletionStats(): Promise<{
        modulesCompleted: bigint;
        domainsCompleted: bigint;
    }>;
    getMyProgress(): Promise<UserProgress>;
    getMyStreakStats(): Promise<StreakStats>;
    getTimeBreakdown(): Promise<TimeBreakdown>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markDomainComplete(domainId: string): Promise<void>;
    markLessonRead(lessonId: string): Promise<void>;
    markModuleComplete(moduleId: string): Promise<void>;
    markSimulationDone(simulationId: string): Promise<void>;
    recordTimeSpent(domain: string, seconds: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitQuiz(quizId: string, score: bigint, passed: boolean): Promise<void>;
    updateStreakStats(today: bigint): Promise<StreakStats>;
}

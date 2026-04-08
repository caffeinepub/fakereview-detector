import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PaginationParams {
    page: bigint;
    pageSize: bigint;
}
export interface ContactInput {
    name: string;
    email: string;
    message: string;
}
export type Timestamp = bigint;
export interface AnalyticsSummary {
    realCount: bigint;
    fakeCount: bigint;
    dailyBreakdown: Array<DailyBreakdown>;
    totalReviews: bigint;
}
export interface DailyBreakdown {
    date: string;
    realCount: bigint;
    fakeCount: bigint;
}
export interface ClassificationResult {
    prediction: Prediction;
    reviewText: string;
    confidence: bigint;
    suspiciousWords: Array<string>;
}
export interface ReviewPage {
    page: bigint;
    pageSize: bigint;
    items: Array<ReviewResult>;
    totalPages: bigint;
    totalItems: bigint;
}
export type ReviewId = bigint;
export interface ReviewResult {
    id: ReviewId;
    prediction: Prediction;
    reviewText: string;
    timestamp: Timestamp;
    confidence: bigint;
    suspiciousWords: Array<string>;
}
export enum Prediction {
    Fake = "Fake",
    Real = "Real"
}
export enum ReviewFilter {
    All = "All",
    Fake = "Fake",
    Real = "Real"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
/**
 * / Composition root for the Fake Review Detection System canister.
 * /
 * / Wires together:
 * /   - Authorization (Internet Identity via caffeineai-authorization)
 * /   - User profiles
 * /   - Review submission, history, analytics, and CSV bulk classification
 * /   - Contact form storage
 * /
 * / No business logic lives here — all implementation is in lib/ and mixins/.
 */
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bulkClassify(texts: Array<string>): Promise<Array<ClassificationResult>>;
    deleteReview(id: bigint): Promise<boolean>;
    getAnalytics(): Promise<AnalyticsSummary>;
    getCallerUserProfile(): Promise<{
        username: string;
        name: string;
    } | null>;
    getCallerUserRole(): Promise<UserRole>;
    getReviewHistory(filter: ReviewFilter, pagination: PaginationParams): Promise<ReviewPage>;
    getUserProfile(user: Principal): Promise<{
        username: string;
        name: string;
    } | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: {
        username: string;
        name: string;
    }): Promise<void>;
    submitContact(input: ContactInput): Promise<boolean>;
    submitReview(reviewText: string): Promise<ReviewResult>;
}

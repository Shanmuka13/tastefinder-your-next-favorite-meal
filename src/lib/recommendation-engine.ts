/**
 * Content-Based Filtering Recommendation Engine
 *
 * Uses TF-IDF–style feature vectors and cosine similarity to recommend
 * restaurants based on cuisine, price tier, rating band, and location.
 * Simulates collaborative filtering by factoring in user interactions
 * (favorites, views) to personalise scores.
 */

import type { Restaurant } from "@/data/restaurants";

/* ------------------------------------------------------------------ */
/*  Feature encoding                                                   */
/* ------------------------------------------------------------------ */

// One-hot dimensions derived from known categories
const CUISINES = ["Italian", "Japanese", "Indian", "Fast Food", "Vegan", "French"] as const;
const PRICE_TIERS = ["₹", "₹₹", "₹₹₹", "₹₹₹₹"] as const;
const LOCATIONS = ["Downtown", "Midtown", "East Side", "West End", "Arts District", "Uptown"] as const;

type Vec = number[];

/** Build a fixed-length numeric feature vector for a restaurant. */
function featureVector(r: Restaurant): Vec {
  const vec: number[] = [];

  // Cuisine one-hot (6 dims)
  CUISINES.forEach((c) => vec.push(r.cuisine === c ? 1 : 0));

  // Price tier one-hot (4 dims)
  PRICE_TIERS.forEach((p) => vec.push(r.priceRange === p ? 1 : 0));

  // Location one-hot (6 dims)
  LOCATIONS.forEach((l) => vec.push(r.location === l ? 1 : 0));

  // Normalised continuous features
  vec.push(r.rating / 5);                             // rating [0,1]
  vec.push(Math.min(r.reviewCount / 600, 1));          // popularity [0,1]
  vec.push(r.isOpen ? 1 : 0);                         // availability

  return vec;
}

/* ------------------------------------------------------------------ */
/*  Vector math helpers                                                */
/* ------------------------------------------------------------------ */

function dot(a: Vec, b: Vec): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function magnitude(v: Vec): number {
  return Math.sqrt(dot(v, v));
}

/** Cosine similarity ∈ [0, 1] */
function cosineSimilarity(a: Vec, b: Vec): number {
  const d = dot(a, b);
  const m = magnitude(a) * magnitude(b);
  return m === 0 ? 0 : d / m;
}

/* ------------------------------------------------------------------ */
/*  User profile builder (simulated collaborative signal)              */
/* ------------------------------------------------------------------ */

export interface UserProfile {
  favoriteIds: string[];
  viewedIds: string[];
}

/**
 * Build a "user preference vector" by averaging the feature vectors of
 * restaurants the user has interacted with, weighting favorites 2×.
 */
function buildUserVector(profile: UserProfile, all: Restaurant[]): Vec | null {
  const entries: { vec: Vec; weight: number }[] = [];

  all.forEach((r) => {
    if (profile.favoriteIds.includes(r.id)) {
      entries.push({ vec: featureVector(r), weight: 2 });
    } else if (profile.viewedIds.includes(r.id)) {
      entries.push({ vec: featureVector(r), weight: 1 });
    }
  });

  if (entries.length === 0) return null;

  const dim = entries[0].vec.length;
  const avg = new Array(dim).fill(0) as Vec;
  let totalWeight = 0;

  entries.forEach(({ vec, weight }) => {
    for (let i = 0; i < dim; i++) avg[i] += vec[i] * weight;
    totalWeight += weight;
  });

  for (let i = 0; i < dim; i++) avg[i] /= totalWeight;
  return avg;
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export interface ScoredRestaurant {
  restaurant: Restaurant;
  score: number;      // 0–1 similarity
  reason: string;     // human-readable explanation
}

/**
 * Get content-based similar restaurants for a given restaurant.
 */
export function getSimilarRestaurants(
  target: Restaurant,
  all: Restaurant[],
  count = 3,
): ScoredRestaurant[] {
  const targetVec = featureVector(target);

  return all
    .filter((r) => r.id !== target.id)
    .map((r) => {
      const score = cosineSimilarity(targetVec, featureVector(r));
      const reason = buildReason(target, r, score);
      return { restaurant: r, score, reason };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

/**
 * Personalised recommendations using the user profile.
 * Falls back to popularity-based ranking if no profile data.
 */
export function getPersonalisedRecommendations(
  all: Restaurant[],
  profile: UserProfile,
  count = 3,
): ScoredRestaurant[] {
  const userVec = buildUserVector(profile, all);

  if (!userVec) {
    // Cold-start: rank by weighted score (rating × log(reviews))
    return all
      .map((r) => ({
        restaurant: r,
        score: (r.rating / 5) * (Math.log2(r.reviewCount + 1) / 10),
        reason: "Popular and highly rated",
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }

  return all
    .filter((r) => !profile.favoriteIds.includes(r.id))
    .map((r) => {
      const similarity = cosineSimilarity(userVec, featureVector(r));
      // Boost open restaurants slightly
      const openBoost = r.isOpen ? 0.05 : 0;
      const score = Math.min(similarity + openBoost, 1);
      const reason = buildPersonalisedReason(r, profile, all);
      return { restaurant: r, score, reason };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

/* ------------------------------------------------------------------ */
/*  Explanation helpers                                                */
/* ------------------------------------------------------------------ */

function buildReason(target: Restaurant, candidate: Restaurant, score: number): string {
  const shared: string[] = [];
  if (target.cuisine === candidate.cuisine) shared.push(`also serves ${candidate.cuisine}`);
  if (target.priceRange === candidate.priceRange) shared.push("similar price range");
  if (target.location === candidate.location) shared.push("same neighbourhood");
  if (Math.abs(target.rating - candidate.rating) <= 0.3) shared.push("comparable rating");

  if (shared.length > 0) return shared.join(", ").replace(/^./, (c) => c.toUpperCase());
  return score > 0.7 ? "Highly similar overall profile" : "You might enjoy this";
}

function buildPersonalisedReason(
  r: Restaurant,
  profile: UserProfile,
  all: Restaurant[],
): string {
  const favCuisines = profile.favoriteIds
    .map((id) => all.find((x) => x.id === id)?.cuisine)
    .filter(Boolean);

  if (favCuisines.includes(r.cuisine)) return `Based on your love for ${r.cuisine} cuisine`;
  if (r.rating >= 4.7) return "Top-rated and trending";
  return "Recommended based on your taste profile";
}

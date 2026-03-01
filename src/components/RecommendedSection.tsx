import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants } from "@/data/restaurants";
import {
  getPersonalisedRecommendations,
  getSimilarRestaurants,
  type UserProfile,
} from "@/lib/recommendation-engine";
import type { Restaurant } from "@/data/restaurants";

interface RecommendedSectionProps {
  /** If provided, shows "Similar to X" recommendations */
  currentRestaurant?: Restaurant;
  /** Title override */
  title?: string;
}

const RecommendedSection = ({ currentRestaurant, title }: RecommendedSectionProps) => {
  const recommendations = useMemo(() => {
    if (currentRestaurant) {
      return getSimilarRestaurants(currentRestaurant, restaurants, 3);
    }

    // Build a mock user profile from the default favorites
    const profile: UserProfile = {
      favoriteIds: restaurants.filter((r) => r.isFavorite).map((r) => r.id),
      viewedIds: restaurants.slice(0, 3).map((r) => r.id),
    };

    return getPersonalisedRecommendations(restaurants, profile, 3);
  }, [currentRestaurant]);

  const heading = title ?? (currentRestaurant ? "Similar Restaurants" : "Recommended for You");

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-main">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            ML-Powered
          </span>
        </div>
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">{heading}</h2>
        <p className="text-muted-foreground mb-8">
          Personalised picks based on cuisine similarity, ratings &amp; your preferences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="relative">
                <RestaurantCard restaurant={rec.restaurant} index={i} />
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    {Math.round(rec.score * 100)}% match
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 px-1 italic">{rec.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;

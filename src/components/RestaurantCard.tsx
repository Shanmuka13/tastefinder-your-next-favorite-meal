import { Heart, Star, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/data/restaurants";
import { motion } from "framer-motion";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
}

const RestaurantCard = ({ restaurant, index = 0 }: RestaurantCardProps) => {
  const [favorite, setFavorite] = useState(restaurant.isFavorite);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group bg-card rounded-lg border border-border overflow-hidden hover-lift"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <button
          onClick={() => setFavorite(!favorite)}
          className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              favorite ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        </button>
        {!restaurant.isOpen && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
              Closed
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading font-semibold text-foreground leading-tight">
            {restaurant.name}
          </h3>
          <span className="text-sm font-medium text-muted-foreground shrink-0">
            {restaurant.priceRange}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="font-medium text-foreground">{restaurant.rating}</span>
            <span className="text-muted-foreground">({restaurant.reviewCount})</span>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            {restaurant.cuisine}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{restaurant.location}</span>
          <span className="mx-1">·</span>
          <span>{restaurant.distance}</span>
        </div>

        <Link to={`/restaurant/${restaurant.id}`}>
          <Button variant="outline" size="sm" className="w-full mt-2">
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;

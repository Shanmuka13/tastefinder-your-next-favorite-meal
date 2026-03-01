import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Clock, Phone, Heart, ArrowLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { restaurants } from "@/data/restaurants";

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const [favorite, setFavorite] = useState(restaurant?.isFavorite ?? false);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Restaurant Not Found</h1>
            <Link to="/restaurants">
              <Button>Back to Restaurants</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Banner */}
      <div className="relative h-[300px] sm:h-[400px]">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="container-main">
            <Link to="/restaurants" className="inline-flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to restaurants
            </Link>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary-foreground mb-2">
                  {restaurant.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-gold text-gold" />
                    <span className="font-semibold text-primary-foreground">{restaurant.rating}</span>
                    <span className="text-primary-foreground/70">({restaurant.reviewCount} reviews)</span>
                  </div>
                  <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">{restaurant.cuisine}</Badge>
                  <span className="text-primary-foreground/70">{restaurant.priceRange}</span>
                </div>
              </div>
              <button
                onClick={() => setFavorite(!favorite)}
                className="p-3 rounded-full bg-card/20 backdrop-blur-sm hover:bg-card/40 transition-colors"
                aria-label="Toggle favorite"
              >
                <Heart className={`h-5 w-5 ${favorite ? "fill-primary text-primary" : "text-primary-foreground"}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding flex-1">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">{restaurant.description}</p>
              </motion.section>

              <Separator />

              {/* Menu Preview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Menu Highlights</h2>
                <div className="space-y-4">
                  {restaurant.menuItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-start p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div>
                        <h4 className="font-medium text-foreground">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      <span className="font-heading font-semibold text-primary shrink-0 ml-4">{item.price}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              <Separator />

              {/* Gallery */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Gallery</h2>
                <div className="grid grid-cols-3 gap-3">
                  {restaurant.gallery.map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden">
                      <img src={img} alt={`${restaurant.name} photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                  ))}
                </div>
              </motion.section>

              <Separator />

              {/* Reviews */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Reviews</h2>
                <div className="space-y-6">
                  {restaurant.reviews.map((review, i) => (
                    <div key={i} className="bg-card rounded-lg border border-border p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">{review.author[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{review.author}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? "fill-gold text-gold" : "text-border"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-lg border border-border p-6 space-y-5">
                  <Button className="w-full" size="lg">
                    Reserve a Table
                  </Button>

                  <Separator />

                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-foreground">{restaurant.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <span className="text-foreground">{restaurant.hours}</span>
                        <Badge variant={restaurant.isOpen ? "default" : "secondary"} className="ml-2 text-xs">
                          {restaurant.isOpen ? "Open" : "Closed"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-foreground">{restaurant.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-muted rounded-lg h-48 flex items-center justify-center border border-border">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Map View</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantDetail;

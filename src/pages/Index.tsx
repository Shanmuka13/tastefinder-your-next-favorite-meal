import { Star, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants, cuisineCategories, testimonials } from "@/data/restaurants";
import RecommendedSection from "@/components/RecommendedSection";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const featured = restaurants.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center">
        <img
          src={heroBg}
          alt="Delicious restaurant food spread"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative container-main w-full px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-4">
              Discover the Best Restaurants Near You
            </h1>
            <p className="text-lg text-primary-foreground/80 font-body">
              Curated recommendations from local food lovers. Find your next favorite spot in seconds.
            </p>
          </motion.div>
          <div className="max-w-3xl">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding">
        <div className="container-main">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Featured Restaurants
              </h2>
              <p className="text-muted-foreground">Hand-picked by our editors</p>
            </div>
            <Link to="/restaurants">
              <Button variant="ghost" className="gap-1 text-primary">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ML Recommendations */}
      <RecommendedSection />

      {/* Categories */}
      <section className="section-padding bg-muted/50">
        <div className="container-main">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-10 text-center">
            Browse by Cuisine
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {cuisineCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to="/restaurants"
                  className="flex flex-col items-center gap-3 p-6 bg-card rounded-lg border border-border hover-lift text-center"
                >
                  <span className="text-4xl">{cat.icon}</span>
                  <span className="font-medium text-foreground text-sm">{cat.name}</span>
                  <span className="text-xs text-muted-foreground">{cat.count} places</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-10 text-center">
            What People Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-lg border border-border p-6 relative"
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">{t.text}</p>
                <div>
                  <p className="font-heading font-semibold text-foreground">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
                <div className="flex gap-0.5 mt-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-main text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Find Your Next Meal?</h2>
          <p className="mb-8 opacity-80 max-w-md mx-auto">
            Browse hundreds of restaurants, read reviews, and reserve your table in seconds.
          </p>
          <Link to="/restaurants">
            <Button
              variant="secondary"
              size="lg"
              className="font-semibold"
            >
              Explore Restaurants
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

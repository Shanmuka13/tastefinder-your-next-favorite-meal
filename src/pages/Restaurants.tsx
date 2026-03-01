import { useState, useMemo } from "react";
import { Star, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants } from "@/data/restaurants";

const Restaurants = () => {
  const [sortBy, setSortBy] = useState("top-rated");
  const [cuisineFilter, setCuisineFilter] = useState("all");
  const [openOnly, setOpenOnly] = useState(false);
  const [minRating, setMinRating] = useState([0]);

  const cuisines = ["all", ...new Set(restaurants.map((r) => r.cuisine))];

  const filtered = useMemo(() => {
    let result = [...restaurants];
    if (cuisineFilter !== "all") result = result.filter((r) => r.cuisine === cuisineFilter);
    if (openOnly) result = result.filter((r) => r.isOpen);
    if (minRating[0] > 0) result = result.filter((r) => r.rating >= minRating[0]);
    if (sortBy === "top-rated") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "most-reviewed") result.sort((a, b) => b.reviewCount - a.reviewCount);
    else if (sortBy === "nearest") result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    return result;
  }, [sortBy, cuisineFilter, openOnly, minRating]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">Cuisine</Label>
        <div className="flex flex-wrap gap-2">
          {cuisines.map((c) => (
            <Button
              key={c}
              variant={cuisineFilter === c ? "default" : "outline"}
              size="sm"
              onClick={() => setCuisineFilter(c)}
              className="capitalize"
            >
              {c === "all" ? "All" : c}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">
          Min Rating: {minRating[0] > 0 ? minRating[0].toFixed(1) : "Any"}
        </Label>
        <Slider value={minRating} onValueChange={setMinRating} max={5} step={0.5} className="mt-2" />
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={openOnly} onCheckedChange={setOpenOnly} id="open-now" />
        <Label htmlFor="open-now" className="text-sm text-foreground">Open Now Only</Label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="section-padding flex-1">
        <div className="container-main">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">All Restaurants</h1>
              <p className="text-muted-foreground mt-1">{filtered.length} restaurants found</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-rated">Top Rated</SelectItem>
                  <SelectItem value="nearest">Nearest</SelectItem>
                  <SelectItem value="most-reviewed">Most Reviewed</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="font-heading">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-card rounded-lg border border-border p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Filters</h3>
                <FilterPanel />
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((r, i) => (
                    <RestaurantCard key={r.id} restaurant={r} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No restaurants match your filters.</p>
                  <Button variant="ghost" className="mt-4 text-primary" onClick={() => { setCuisineFilter("all"); setMinRating([0]); setOpenOnly(false); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Restaurants;

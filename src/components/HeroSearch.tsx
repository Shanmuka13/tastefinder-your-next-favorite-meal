import { Search, MapPin, ChefHat, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSearch = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/restaurants");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-card/95 backdrop-blur-md rounded-lg p-4 sm:p-6 shadow-lg border border-border"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Location" className="pl-10" />
        </div>

        <Select>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Cuisine" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cuisines</SelectItem>
            <SelectItem value="italian">Italian</SelectItem>
            <SelectItem value="japanese">Japanese</SelectItem>
            <SelectItem value="indian">Indian</SelectItem>
            <SelectItem value="fast-food">Fast Food</SelectItem>
            <SelectItem value="vegan">Vegan</SelectItem>
            <SelectItem value="french">French</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Price Range" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Price</SelectItem>
            <SelectItem value="₹">₹ - Budget</SelectItem>
            <SelectItem value="₹₹">₹₹ - Moderate</SelectItem>
            <SelectItem value="₹₹₹">₹₹₹ - Upscale</SelectItem>
            <SelectItem value="₹₹₹₹">₹₹₹₹ - Fine Dining</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroSearch;

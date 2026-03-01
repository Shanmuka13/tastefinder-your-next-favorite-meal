import restaurant1 from "@/assets/restaurant-1.jpg";
import restaurant2 from "@/assets/restaurant-2.jpg";
import restaurant3 from "@/assets/restaurant-3.jpg";
import restaurant4 from "@/assets/restaurant-4.jpg";
import restaurant5 from "@/assets/restaurant-5.jpg";
import restaurant6 from "@/assets/restaurant-6.jpg";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  cuisine: string;
  priceRange: "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹";
  location: string;
  address: string;
  description: string;
  isOpen: boolean;
  isFavorite: boolean;
  distance: string;
  phone: string;
  hours: string;
  menuItems: { name: string; price: string; description: string }[];
  reviews: { author: string; rating: number; text: string; date: string }[];
  gallery: string[];
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Trattoria Bella Vista",
    image: restaurant1,
    rating: 4.8,
    reviewCount: 342,
    cuisine: "Italian",
    priceRange: "₹₹₹",
    location: "Downtown",
    address: "123 Main Street, Downtown",
    description: "Authentic Italian cuisine in a warm, rustic setting with handmade pasta and wood-fired pizzas. Our chef brings 20 years of experience from Naples.",
    isOpen: true,
    isFavorite: false,
    distance: "0.5 km",
    phone: "+91 98765 43210",
    hours: "11:00 AM - 10:00 PM",
    menuItems: [
      { name: "Truffle Pasta", price: "₹2,100", description: "Fresh tagliatelle with black truffle cream sauce" },
      { name: "Margherita Pizza", price: "₹1,350", description: "San Marzano tomatoes, fresh mozzarella, basil" },
      { name: "Osso Buco", price: "₹2,700", description: "Slow-braised veal shanks with gremolata" },
      { name: "Tiramisu", price: "₹900", description: "Classic Italian coffee-flavored dessert" },
    ],
    reviews: [
      { author: "Sarah M.", rating: 5, text: "The best Italian food I've had outside of Italy. The truffle pasta is divine!", date: "2 days ago" },
      { author: "James K.", rating: 5, text: "Incredible ambiance and even better food. Will definitely be back.", date: "1 week ago" },
      { author: "Emily R.", rating: 4, text: "Great food, slightly slow service on weekends but worth the wait.", date: "2 weeks ago" },
    ],
    gallery: [restaurant1, restaurant6, restaurant2],
  },
  {
    id: "2",
    name: "Sakura Sushi Bar",
    image: restaurant2,
    rating: 4.6,
    reviewCount: 218,
    cuisine: "Japanese",
    priceRange: "₹₹₹₹",
    location: "Midtown",
    address: "456 Oak Avenue, Midtown",
    description: "Premium omakase and sushi experience with fish flown in daily from Tokyo's Tsukiji market.",
    isOpen: true,
    isFavorite: true,
    distance: "1.2 km",
    phone: "+91 98765 43211",
    hours: "12:00 PM - 11:00 PM",
    menuItems: [
      { name: "Omakase (12 pieces)", price: "₹6,375", description: "Chef's selection of premium nigiri" },
      { name: "Dragon Roll", price: "₹1,650", description: "Eel, avocado, cucumber with spicy mayo" },
      { name: "Sashimi Platter", price: "₹3,375", description: "18 pieces of assorted fresh sashimi" },
      { name: "Mochi Ice Cream", price: "₹600", description: "Green tea, mango, and strawberry" },
    ],
    reviews: [
      { author: "Mike T.", rating: 5, text: "Best sushi in the city, hands down. The omakase is a must-try.", date: "3 days ago" },
      { author: "Lisa W.", rating: 4, text: "Fresh fish, beautiful presentation. A bit pricey but worth it for special occasions.", date: "1 week ago" },
    ],
    gallery: [restaurant2, restaurant1, restaurant5],
  },
  {
    id: "3",
    name: "Spice Palace",
    image: restaurant3,
    rating: 4.5,
    reviewCount: 189,
    cuisine: "Indian",
    priceRange: "₹₹",
    location: "East Side",
    address: "789 Curry Lane, East Side",
    description: "Vibrant Indian cuisine with recipes passed down through generations. Known for our butter chicken and fresh naan.",
    isOpen: true,
    isFavorite: false,
    distance: "0.8 km",
    phone: "+91 98765 43212",
    hours: "11:30 AM - 10:30 PM",
    menuItems: [
      { name: "Butter Chicken", price: "₹450", description: "Tender chicken in rich tomato cream sauce" },
      { name: "Lamb Biryani", price: "₹550", description: "Aromatic basmati rice with slow-cooked lamb" },
      { name: "Paneer Tikka", price: "₹350", description: "Marinated cottage cheese grilled in tandoor" },
      { name: "Gulab Jamun", price: "₹200", description: "Sweet milk dumplings in rose syrup" },
    ],
    reviews: [
      { author: "Priya S.", rating: 5, text: "Reminds me of home cooking. The biryani is spectacular!", date: "5 days ago" },
      { author: "David L.", rating: 4, text: "Authentic flavors and generous portions. Great value.", date: "2 weeks ago" },
    ],
    gallery: [restaurant3, restaurant4, restaurant1],
  },
  {
    id: "4",
    name: "The Burger Barn",
    image: restaurant4,
    rating: 4.3,
    reviewCount: 567,
    cuisine: "Fast Food",
    priceRange: "₹",
    location: "West End",
    address: "321 Grill Street, West End",
    description: "Gourmet burgers crafted from locally sourced beef with creative toppings and hand-cut fries.",
    isOpen: false,
    isFavorite: false,
    distance: "2.1 km",
    phone: "+91 98765 43213",
    hours: "11:00 AM - 9:00 PM",
    menuItems: [
      { name: "Classic Smash Burger", price: "₹300", description: "Double patty, American cheese, special sauce" },
      { name: "Truffle Mushroom Burger", price: "₹400", description: "Swiss cheese, sautéed mushrooms, truffle aioli" },
      { name: "Loaded Fries", price: "₹225", description: "Bacon, cheese, jalapeños, ranch" },
      { name: "Milkshake", price: "₹175", description: "Vanilla, chocolate, or strawberry" },
    ],
    reviews: [
      { author: "Tom B.", rating: 5, text: "Best burgers in town! The smash burger is perfection.", date: "1 day ago" },
      { author: "Anna C.", rating: 4, text: "Great casual spot. Love the truffle mushroom burger.", date: "4 days ago" },
    ],
    gallery: [restaurant4, restaurant2, restaurant5],
  },
  {
    id: "5",
    name: "Green Garden Bistro",
    image: restaurant5,
    rating: 4.7,
    reviewCount: 156,
    cuisine: "Vegan",
    priceRange: "₹₹",
    location: "Arts District",
    address: "654 Plant Avenue, Arts District",
    description: "Creative plant-based cuisine that proves vegan food can be both delicious and visually stunning.",
    isOpen: true,
    isFavorite: true,
    distance: "1.5 km",
    phone: "+91 98765 43214",
    hours: "10:00 AM - 9:00 PM",
    menuItems: [
      { name: "Buddha Bowl", price: "₹400", description: "Quinoa, roasted vegetables, tahini dressing" },
      { name: "Mushroom Risotto", price: "₹500", description: "Creamy arborio rice with wild mushrooms" },
      { name: "Acai Bowl", price: "₹350", description: "Fresh acai, granola, seasonal fruits" },
      { name: "Raw Chocolate Cake", price: "₹250", description: "Rich cacao, cashew cream, date crust" },
    ],
    reviews: [
      { author: "Sophie G.", rating: 5, text: "Changed my mind about vegan food! Everything is so flavorful.", date: "3 days ago" },
      { author: "Chris P.", rating: 5, text: "Beautiful space, amazing food. The Buddha bowl is my go-to.", date: "1 week ago" },
    ],
    gallery: [restaurant5, restaurant3, restaurant6],
  },
  {
    id: "6",
    name: "Le Petit Château",
    image: restaurant6,
    rating: 4.9,
    reviewCount: 423,
    cuisine: "French",
    priceRange: "₹₹₹₹",
    location: "Uptown",
    address: "987 Elegance Blvd, Uptown",
    description: "Fine French dining with an extensive wine list. Perfect for special occasions and romantic evenings.",
    isOpen: true,
    isFavorite: false,
    distance: "3.0 km",
    phone: "+91 98765 43215",
    hours: "5:00 PM - 11:00 PM",
    menuItems: [
      { name: "Foie Gras", price: "₹2,400", description: "Seared with fig compote and brioche" },
      { name: "Beef Bourguignon", price: "₹3,150", description: "Slow-braised beef in red wine sauce" },
      { name: "Crème Brûlée", price: "₹1,050", description: "Classic vanilla bean custard" },
      { name: "Cheese Board", price: "₹1,800", description: "Selection of French artisan cheeses" },
    ],
    reviews: [
      { author: "Robert F.", rating: 5, text: "An unforgettable dining experience. Every course was perfection.", date: "2 days ago" },
      { author: "Claire D.", rating: 5, text: "The best French restaurant in the city. Impeccable service.", date: "1 week ago" },
    ],
    gallery: [restaurant6, restaurant1, restaurant3],
  },
];

export const cuisineCategories = [
  { name: "Italian", icon: "🍝", count: 45 },
  { name: "Japanese", icon: "🍣", count: 32 },
  { name: "Indian", icon: "🍛", count: 28 },
  { name: "Fast Food", icon: "🍔", count: 67 },
  { name: "Vegan", icon: "🥗", count: 23 },
  { name: "French", icon: "🥐", count: 18 },
];

export const testimonials = [
  {
    text: "TasteFinder helped me discover an amazing hidden gem just two blocks from my apartment. I've been going back every week!",
    author: "Amanda Chen",
    role: "Food Blogger",
  },
  {
    text: "The filters are incredibly intuitive. I found the perfect vegan restaurant for my dietary needs within minutes.",
    author: "Marcus Johnson",
    role: "Health Coach",
  },
  {
    text: "We use TasteFinder for all our team dinners. It never disappoints with its recommendations!",
    author: "Rachel Kim",
    role: "Marketing Director",
  },
];

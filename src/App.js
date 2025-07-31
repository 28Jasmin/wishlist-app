import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus, FiChevronLeft, FiChevronRight, FiHome, FiSearch, FiUser, FiX, FiCheck,
  FiMapPin, FiTag, FiBookmark, FiHeart, FiVideo, FiMusic, FiStar, FiTrendingUp, FiFolder, FiEdit2, FiTrash2, FiImage, FiUpload
} from "react-icons/fi";

// Import animation variants
import { pageFade, slideUp, slideDown, staggerContainer, itemFade, scaleIn, fabEntry } from "./animations/variants";
// Import new Siena-style card
import SienaStyleCard from "./components/SienaStyleCard";

// Enhanced theme optimized for S25 Ultra
const theme = {
  colors: {
    bg: "#FDFBF7",
    surface: "#FFFFFF",
    surfaceHover: "#F9F7F4",
    glass: "rgba(255, 255, 255, 0.7)",
    glassDark: "rgba(255, 255, 255, 0.5)",
    text: {
      primary: "#2D2D2F",
      secondary: "#7A7D85",
      tertiary: "#B5B7C0",
    },
    border: "rgba(225, 227, 234, 0.5)",
    borderLight: "rgba(225, 227, 234, 0.3)",
    accent: {
      primary: "#5B5BD6",
      secondary: "#FF6B6B",
      tertiary: "#4ECDC4",
      quaternary: "#FFE66D",
      pink: "#FFB5D8",
      purple: "#B794F6",
      mint: "#81E6D9",
      peach: "#FBBAA3",
    },
    gradient: {
      sunset: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
      ocean: "linear-gradient(135deg, #4ECDC4 0%, #5B5BD6 100%)",
      lavender: "linear-gradient(135deg, #B794F6 0%, #FFB5D8 100%)",
      mint: "linear-gradient(135deg, #81E6D9 0%, #4ECDC4 100%)",
      peach: "linear-gradient(135deg, #FBBAA3 0%, #FF6B6B 100%)",
    },
    success: "#4ECDC4",
    warning: "#FFE66D",
    error: "#FF6B6B",
    info: "#5B5BD6",
  },
  shadows: {
    xs: "0 2px 4px rgba(45, 45, 47, 0.02)",
    sm: "0 4px 8px rgba(45, 45, 47, 0.03)",
    md: "0 8px 16px rgba(45, 45, 47, 0.04)",
    lg: "0 16px 32px rgba(45, 45, 47, 0.06)",
    xl: "0 24px 48px rgba(45, 45, 47, 0.08)",
    glass: "0 8px 32px rgba(31, 38, 135, 0.1)",
    glassLg: "0 16px 48px rgba(31, 38, 135, 0.15)",
    glow: "0 0 20px rgba(91, 91, 214, 0.3)",
  },
  blur: {
    sm: "blur(8px)",
    md: "blur(16px)",
    lg: "blur(24px)",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
  transitions: {
    fast: "120ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// Default categories
const defaultCategories = [
  "Restaurant",
  "Adventure", 
  "Travel",
  "Games",
  "Movies",
  "Books",
  "Music",
  "Shopping"
];

// Enhanced sample data with more items and reviews
const initialWishes = [
  // Restaurant Category
  {
    id: "1",
    content: "Le Bernardin NYC",
    type: "food",
    category: "Restaurant",
    media: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 18),
    tags: ["fine-dining", "seafood", "michelin"],
    reviews: [
      { source: "Michelin Guide", quote: "Exceptional seafood artistry" },
      { source: "NY Times", quote: "Poetry in motion on every plate" },
      { source: "Food & Wine", quote: "A temple to the sea's bounty" }
    ],
    notes: "Three Michelin stars. Known for exquisite seafood preparations and impeccable service.",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    content: "Osteria Francescana",
    type: "food",
    category: "Restaurant",
    media: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 20),
    tags: ["italian", "modena", "michelin"],
    reviews: [
      { source: "World's 50 Best", quote: "Emotional Italian storytelling through food" },
      { source: "Gambero Rosso", quote: "Bottura's genius knows no bounds" },
      { source: "La Repubblica", quote: "A cathedral of modern Italian cuisine" }
    ],
    notes: "Chef Massimo Bottura's three-Michelin-starred restaurant in Modena, Italy.",
    priority: "high",
    completed: false,
  },
  {
    id: "3",
    content: "Narisawa Tokyo",
    type: "food",
    category: "Restaurant",
    media: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 5),
    tags: ["japanese", "innovative", "tokyo"],
    reviews: [
      { source: "Asia's 50 Best", quote: "Revolutionary Satoyama cuisine philosophy" },
      { source: "Time Out Tokyo", quote: "Nature transformed into edible art" },
      { source: "Gourmet Traveller", quote: "Sustainability never tasted so extraordinary" }
    ],
    notes: "Innovative Satoyama cuisine celebrating Japanese nature and sustainability.",
    priority: "medium",
    completed: false,
  },
  {
    id: "4",
    content: "Central Lima",
    type: "food",
    category: "Restaurant",
    media: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 10),
    tags: ["peruvian", "altitude-dining", "lima"],
    reviews: [
      { source: "Latin America's 50 Best", quote: "A vertical journey through Peru's ecosystems" },
      { source: "Condé Nast Traveler", quote: "Culinary expedition of a lifetime" },
      { source: "El Comercio", quote: "Peru's biodiversity on a plate" }
    ],
    notes: "Experience Peru's biodiversity through altitude-based tasting menu.",
    priority: "high",
    completed: false,
  },
  {
    id: "5",
    content: "Noma Copenhagen",
    type: "food",
    category: "Restaurant",
    media: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 15),
    tags: ["nordic", "foraging", "seasonal"],
    reviews: [
      { source: "The Guardian", quote: "Redefined what restaurant dining can be" },
      { source: "Bon Appétit", quote: "Foraging elevated to high art" },
      { source: "Copenhagen Post", quote: "Nordic cuisine's crown jewel" }
    ],
    notes: "World-renowned restaurant focusing on foraging and fermentation.",
    priority: "high",
    completed: false,
  },
  {
    id: "6",
    content: "Blue Hill at Stone Barns",
    type: "food",
    category: "Restaurant",
    media: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 20),
    tags: ["farm-to-table", "new-york", "sustainable"],
    reviews: [
      { source: "New York Magazine", quote: "Farm-to-table dining perfected" },
      { source: "Eater NY", quote: "A love letter to sustainable agriculture" },
      { source: "Village Voice", quote: "Every bite tells a story of the land" }
    ],
    notes: "Farm-to-table dining experience at Pocantico Hills, New York.",
    priority: "medium",
    completed: false,
  },
  {
    id: "7",
    content: "Eleven Madison Park",
    type: "food",
    category: "Restaurant",
    media: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 25),
    tags: ["plant-based", "nyc", "fine-dining"],
    reviews: [
      { source: "James Beard Foundation", quote: "Plant-based fine dining revolutionized" },
      { source: "Grub Street", quote: "Vegetables have never been this luxurious" },
      { source: "TimeOut NY", quote: "A bold new chapter in fine dining" }
    ],
    notes: "Michelin three-star restaurant with entirely plant-based menu.",
    priority: "medium",
    completed: false,
  },
  
  // Adventure Category
  {
    id: "8",
    content: "Skydiving in Dubai",
    type: "experience",
    category: "Adventure",
    media: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 0, 20),
    tags: ["extreme", "dubai", "bucket-list"],
    reviews: [
      { source: "Adventure Travel Magazine", quote: "The ultimate adrenaline rush over Dubai's skyline" },
      { source: "National Geographic", quote: "A bird's eye view of architectural wonder" },
      { source: "Travel + Leisure", quote: "Pure exhilaration meets breathtaking beauty" }
    ],
    notes: "Jump from 13,000 feet over Palm Jumeirah with stunning views of Dubai skyline.",
    priority: "high",
    completed: false,
  },
  {
    id: "9",
    content: "Great Barrier Reef Diving",
    type: "experience",
    category: "Adventure",
    media: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 5),
    tags: ["ocean", "australia", "diving"],
    reviews: [
      { source: "Scuba Diving Magazine", quote: "An underwater paradise like no other" },
      { source: "Australian Geographic", quote: "Nature's most spectacular light show" },
      { source: "BBC Earth", quote: "The world's largest living structure awaits" }
    ],
    notes: "Explore the underwater world of colorful coral reefs and marine life.",
    priority: "high",
    completed: false,
  },
  {
    id: "10",
    content: "Mount Everest Base Camp",
    type: "experience",
    category: "Adventure",
    media: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 10),
    tags: ["trekking", "nepal", "himalayas"],
    reviews: [
      { source: "Outside Magazine", quote: "Life-changing journey to the roof of the world" },
      { source: "Himalayan Times", quote: "A spiritual pilgrimage through stunning landscapes" },
      { source: "Adventure Journal", quote: "The ultimate test of endurance and spirit" }
    ],
    notes: "14-day trek to Everest Base Camp at 5,364 meters altitude.",
    priority: "high",
    completed: false,
  },
  {
    id: "11",
    content: "Bungee Jump Queenstown",
    type: "experience",
    category: "Adventure",
    media: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 15),
    tags: ["extreme", "new-zealand", "adrenaline"],
    reviews: [
      { source: "Adrenaline Junkie", quote: "The most terrifying 8.5 seconds of pure bliss" },
      { source: "Queenstown Tourism", quote: "Adventure capital's crown jewel experience" },
      { source: "Thrill Seeker Weekly", quote: "Gravity defying leap into paradise" }
    ],
    notes: "134m jump from Nevis Bungy, one of the highest in the world.",
    priority: "medium",
    completed: false,
  },
  {
    id: "12",
    content: "Amazon Rainforest Trek",
    type: "experience",
    category: "Adventure",
    media: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 20),
    tags: ["jungle", "brazil", "wildlife"],
    reviews: [
      { source: "National Geographic", quote: "Immersion in Earth's lungs" },
      { source: "Amazon Conservation", quote: "A humbling journey through nature's cathedral" },
      { source: "Wild Life Magazine", quote: "Biodiversity beyond imagination" }
    ],
    notes: "5-day survival trek through the Amazon with indigenous guides.",
    priority: "medium",
    completed: false,
  },
  {
    id: "13",
    content: "Antarctica Expedition",
    type: "experience",
    category: "Adventure",
    media: "https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 25),
    tags: ["expedition", "polar", "wildlife"],
    reviews: [
      { source: "Polar Expeditions", quote: "The last great wilderness on Earth" },
      { source: "Scientific American", quote: "A journey to the edge of the world" },
      { source: "Adventure Travel Trade", quote: "Pristine beauty that changes you forever" }
    ],
    notes: "2-week expedition cruise to the Antarctic Peninsula.",
    priority: "high",
    completed: false,
  },
  {
    id: "14",
    content: "Sahara Desert Camel Trek",
    type: "experience",
    category: "Adventure",
    media: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 1),
    tags: ["desert", "morocco", "camping"],
    reviews: [
      { source: "Morocco Tourism", quote: "Ancient nomadic traditions come alive" },
      { source: "Desert Magazine", quote: "Silence and solitude in endless golden dunes" },
      { source: "Berber Cultural Center", quote: "A timeless journey through shifting sands" }
    ],
    notes: "3-day camel trek through Sahara with Berber guides and desert camping.",
    priority: "medium",
    completed: false,
  },
  
  // Travel Category
  {
    id: "15",
    content: "Northern Lights in Iceland",
    type: "travel",
    category: "Travel",
    media: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 10),
    tags: ["iceland", "aurora", "winter"],
    reviews: [
      { source: "Iceland Review", quote: "Nature's most spectacular light show" },
      { source: "Aurora Watch", quote: "Dancing curtains of ethereal beauty" },
      { source: "Visit Iceland", quote: "A celestial ballet across the Arctic sky" }
    ],
    notes: "Best viewing from September to March, away from Reykjavik's lights.",
    location: "Reykjavik, Iceland",
    priority: "high",
    completed: false,
  },
  {
    id: "16",
    content: "Santorini Sunset",
    type: "travel",
    category: "Travel",
    media: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 0, 15),
    tags: ["greece", "island", "romantic"],
    reviews: [
      { source: "Greek Islands Guide", quote: "The world's most romantic sunset" },
      { source: "Condé Nast Traveler", quote: "Postcard perfection in every moment" },
      { source: "Travel & Leisure", quote: "Blue and white paradise kissed by golden light" }
    ],
    notes: "Watch sunset from Oia castle, arrive early for best viewing spots.",
    location: "Santorini, Greece",
    priority: "medium",
    completed: false,
  },
  {
    id: "17",
    content: "Cherry Blossoms Japan",
    type: "travel",
    category: "Travel",
    media: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 28),
    tags: ["japan", "sakura", "spring"],
    reviews: [
      { source: "Japan National Tourism", quote: "Fleeting beauty that captures the soul" },
      { source: "Sakura Forecast", quote: "Pink petals painting ancient temples" },
      { source: "Time Out Tokyo", quote: "Spring's most celebrated celebration" }
    ],
    notes: "Peak bloom typically late March to early April in Tokyo and Kyoto.",
    location: "Kyoto, Japan",
    priority: "high",
    completed: false,
  },
  {
    id: "18",
    content: "Machu Picchu Trek",
    type: "travel",
    category: "Travel",
    media: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 5),
    tags: ["peru", "inca", "hiking"],
    reviews: [
      { source: "UNESCO World Heritage", quote: "Lost city that time forgot" },
      { source: "Inca Trail Society", quote: "Ancient stones whispering stories of the past" },
      { source: "Peru Tourism", quote: "Crown jewel of the Inca Empire" }
    ],
    notes: "4-day Inca Trail trek or take train from Cusco to Aguas Calientes.",
    location: "Cusco, Peru",
    priority: "high",
    completed: false,
  },
  {
    id: "19",
    content: "Safari in Kenya",
    type: "travel",
    category: "Travel",
    media: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 10),
    tags: ["africa", "wildlife", "safari"],
    reviews: [
      { source: "Kenya Wildlife Service", quote: "Front row seats to nature's greatest drama" },
      { source: "Safari Magazine", quote: "Where the circle of life unfolds daily" },
      { source: "African Geographic", quote: "Endless plains teeming with magnificent wildlife" }
    ],
    notes: "Visit during Great Migration (July-October) in Masai Mara.",
    location: "Masai Mara, Kenya",
    priority: "high",
    completed: false,
  },
  {
    id: "20",
    content: "Banff National Park",
    type: "travel",
    category: "Travel",
    media: "https://images.unsplash.com/photo-1609963095806-c6b65827e8d0?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 15),
    tags: ["canada", "mountains", "nature"],
    reviews: [
      { source: "Parks Canada", quote: "Canadian Rockies at their most majestic" },
      { source: "Outside Magazine", quote: "Turquoise lakes reflecting snow-capped peaks" },
      { source: "Canadian Geographic", quote: "Alpine paradise in the heart of the Rockies" }
    ],
    notes: "Visit Lake Louise and Moraine Lake, best in summer for hiking.",
    location: "Alberta, Canada",
    priority: "medium",
    completed: false,
  },
  {
    id: "21",
    content: "Maldives Overwater Villa",
    type: "travel",
    category: "Travel",
    media: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 20),
    tags: ["maldives", "beach", "luxury"],
    reviews: [
      { source: "Maldives Tourism", quote: "Paradise floating on crystal clear waters" },
      { source: "Luxury Travel Magazine", quote: "Ultimate tropical escape redefined" },
      { source: "Travel + Leisure", quote: "Where luxury meets pristine natural beauty" }
    ],
    notes: "Stay in overwater bungalow, best weather November to April.",
    location: "Maldives",
    priority: "medium",
    completed: false,
  },
];

// Utility functions
const formatDate = (date) => {
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
};

const getTypeIcon = (type) => {
  const icons = {
    travel: <FiMapPin />,
    book: <FiBookmark />,
    skill: <FiTrendingUp />,
    food: <FiHeart />,
    movie: <FiVideo />,
    music: <FiMusic />,
    shopping: <FiTag />,
    experience: <FiStar />,
  };
  return icons[type] || <FiFolder />;
};

// Get gradient for category
const getCategoryGradient = (category) => {
  const gradients = {
    Restaurant: theme.colors.gradient.peach,
    Adventure: theme.colors.gradient.sunset,
    Travel: theme.colors.gradient.ocean,
    Games: theme.colors.gradient.lavender,
    Movies: theme.colors.gradient.mint,
    Books: theme.colors.gradient.ocean,
    Music: theme.colors.gradient.lavender,
    Shopping: theme.colors.gradient.peach,
  };
  return gradients[category] || theme.colors.gradient.ocean;
};

// --- Media Picker Component (S25 Ultra Optimized) ---
const MediaPicker = ({ value, onChange, onRemove }) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState(value ? { url: value, type: value.endsWith('.mp4') ? 'video' : 'image' } : null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type.startsWith('video') ? 'video' : 'image';
    if (type === 'video') {
      // create a temp video element to measure duration
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      tempVideo.src = URL.createObjectURL(file);
      tempVideo.onloadedmetadata = () => {
        URL.revokeObjectURL(tempVideo.src);
        if (tempVideo.duration > 60) {
          alert('Sorry, videos longer than 60 seconds are not allowed.');
          e.target.value = '';
          return;
        }
        // OK to proceed
        const url = URL.createObjectURL(file);
        setPreview({ url, type, file });
        onChange({ url, file, type });
      };
      return;
    }

    // image path (or very short video fallback)
    const url = URL.createObjectURL(file);
    setPreview({ url, type, file });
    onChange({ url, file, type });
  };

  const handleRemove = () => {
    setPreview(null);
    onRemove && onRemove();
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (value && !preview) {
      setPreview({ url: value, type: value.endsWith('.mp4') ? 'video' : 'image' });
    }
  }, [value]);

  return (
    <motion.div 
      variants={itemFade}
      style={{ marginBottom: 28 }}
    >
      <label style={{
        display: 'block',
        fontSize: 16,
        fontWeight: 600,
        color: theme.colors.text.secondary,
        marginBottom: 12,
        fontFamily: 'Nexus Sherif, Playfair Display, serif',
      }}>
        Media (Image or Video)
      </label>
      {preview ? (
        <div style={{ 
          marginBottom: 20, 
          position: 'relative', 
          width: '100%',
          borderRadius: theme.radius.lg,
          overflow: 'hidden',
          boxShadow: theme.shadows.md,
        }}>
          {preview.type === "image" ? (
            <img 
              src={preview.url} 
              alt="preview" 
              style={{ 
                width: '100%', 
                height: 240, 
                objectFit: 'cover',
                display: 'block',
              }} 
            />
          ) : (
            <video 
              src={preview.url} 
              autoPlay
              muted
              loop
              playsInline
              style={{ 
                width: '100%', 
                height: 240, 
                objectFit: 'cover',
                display: 'block',
              }} 
            />
          )}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={handleRemove}
            style={{
              position: 'absolute', 
              top: 12, 
              right: 12, 
              background: theme.colors.glass,
              backdropFilter: theme.blur.sm,
              border: 'none', 
              borderRadius: theme.radius.full, 
              padding: 12,
              cursor: 'pointer', 
              boxShadow: theme.shadows.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 48,
              minHeight: 48,
            }}
            aria-label="Remove media"
          >
            <FiX size={20} color={theme.colors.text.primary} />
          </motion.button>
        </div>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => inputRef.current && inputRef.current.click()}
        style={{
          padding: '16px 28px',
          background: theme.colors.glass,
          backdropFilter: theme.blur.sm,
          color: theme.colors.text.primary,
          border: `2px dashed ${theme.colors.border}`,
          borderRadius: theme.radius.lg,
          fontSize: 17,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'Nexus Sherif, Playfair Display, serif',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          width: '100%',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          minHeight: 56,
        }}
      >
        {preview ? <FiImage size={20} /> : <FiUpload size={20} />}
        {preview ? "Change Media" : "Add Media"}
      </motion.button>
    </motion.div>
  );
};

// Category Tabs Component (S25 Ultra Optimized)
const CategoryTabs = ({ categories, selected, onSelect }) => {
  const scrollRef = useRef(null);
  
  useEffect(() => {
    // Auto-scroll to selected category
    if (scrollRef.current && selected) {
      const selectedButton = scrollRef.current.querySelector(`[data-category="${selected}"]`);
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selected]);
  
  return (
    <motion.div
      ref={scrollRef}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        overflowX: 'auto',
        borderBottom: `1px solid ${theme.colors.border}`,
        padding: '0',
        gap: 0,
        background: `linear-gradient(to bottom, ${theme.colors.bg}, ${theme.colors.surface})`,
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        scrollSnapType: 'x mandatory',
        boxShadow: theme.shadows.xs,
      }}
      className="hide-scrollbar"
    >
      {categories.map(cat => (
        <motion.button
          key={cat}
          data-category={cat}
          onClick={() => onSelect(cat)}
          variants={itemFade}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          style={{
            border: 'none',
            background: 'none',
            fontWeight: selected === cat ? 700 : 500,
            borderBottom: selected === cat ? `3px solid ${theme.colors.accent.primary}` : '3px solid transparent',
            color: selected === cat ? theme.colors.text.primary : theme.colors.text.tertiary,
            padding: '20px 24px',
            fontSize: 17,
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            scrollSnapAlign: 'start',
            WebkitTapHighlightColor: 'transparent',
            fontFamily: 'Nexus Sherif, Playfair Display, serif',
            minHeight: 64,
          }}
        >
          {cat}
        </motion.button>
      ))}
    </motion.div>
  );
};

// --- FannedCardStack with Swipe Up Action Menu (S25 Ultra Optimized) ---
const FannedCardStack = ({ wishes, onCardClick, onEdit, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAction, setShowAction] = useState(false);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
    setShowAction(false);
    setTimeout(() => setIsAnimating(false), 350);
  }, [wishes.length, isAnimating]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % wishes.length);
    setShowAction(false);
    setTimeout(() => setIsAnimating(false), 350);
  }, [wishes.length, isAnimating]);

  // Touch handling for swipe left/right/up (S25 Ultra optimized)
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    touchEnd.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchMove = (e) => {
    const t = e.touches[0];
    touchEnd.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = () => {
    const dx = touchEnd.current.x - touchStart.current.x;
    const dy = touchEnd.current.y - touchStart.current.y;
    
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      // horizontal swipe (increased threshold for S25 Ultra)
      if (dx < 0) handleNext();
      else handlePrevious();
    } else if (dy < -80 && Math.abs(dy) > Math.abs(dx)) {
      // swipe up (increased threshold for S25 Ultra)
      setShowAction(true);
    }
  };

  const handleActionClose = () => {
    setShowAction(false);
  };

  const getCardStyle = (index, wishIndex) => {
    const diff = (wishIndex - currentIndex + wishes.length) % wishes.length;
    const adjustedDiff = diff > wishes.length / 2 ? diff - wishes.length : diff;

    const isActive = adjustedDiff === 0;
    const scale = 1 - Math.abs(adjustedDiff) * 0.04; // Slightly less dramatic for S25 Ultra
    const rotate = adjustedDiff * 5; // Reduced rotation
    const translateX = adjustedDiff * 60; // Increased for larger screen
    const translateY = Math.abs(adjustedDiff) * 18;
    const zIndex = wishes.length - Math.abs(adjustedDiff);
    const opacity = 1 - Math.abs(adjustedDiff) * 0.15;

    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `
        translate(-50%, -50%)
        translateX(${translateX}px)
        translateY(${translateY}px)
        scale(${scale})
        rotate(${rotate}deg)
      `,
      zIndex,
      opacity: Math.abs(adjustedDiff) > 2 ? 0 : opacity,
      transition: isAnimating ? 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
      cursor: isActive ? 'pointer' : 'default',
      pointerEvents: isActive ? 'auto' : 'none',
      willChange: 'transform',
      filter: isActive ? 'none' : 'brightness(0.96)',
    };
  };

  const currentWish = wishes[currentIndex];

  return (
    <motion.div 
      variants={slideUp}
      initial="hidden"
      animate="visible"
      style={{
        position: 'relative',
        width: '100%',
        padding: '48px 24px 160px',
        minHeight: 680,
      }}
    >
      {/* Cards Container */}
      <div
        style={{
          position: 'relative',
          height: 560, // Increased for S25 Ultra
          maxWidth: 360, // Increased for S25 Ultra
          margin: '0 auto',
          perspective: '1200px',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {wishes.map((wish, idx) => (
          <div
            key={wish.id}
            style={getCardStyle(currentIndex, idx)}
            onClick={() => idx === currentIndex && !showAction && onCardClick(wish)}
          >
            <motion.div 
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              style={{ perspective: 900 }}
            >
              <SienaStyleCard wish={wish} />
            </motion.div>

            {/* Swipe Up Action Overlay */}
            <AnimatePresence>
              {showAction && idx === currentIndex && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    zIndex: 10,
                    background: 'rgba(0,0,0,0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 28,
                    pointerEvents: 'auto',
                    backdropFilter: 'blur(6px)',
                  }}
                  onClick={handleActionClose}
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0, y: 48 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.6, opacity: 0, y: 48 }}
                    transition={{ type: 'spring', damping: 18, stiffness: 250 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 48,
                      marginBottom: 16,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ scale: 1.1, boxShadow: "0 28px 56px rgba(91,91,214,0.4)" }}
                      onClick={() => { onEdit(wish); setShowAction(false); }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #5B5BD6 0%, #B794F6 100%)',
                        boxShadow: '0 12px 48px rgba(91,91,214,0.4)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      aria-label="Edit"
                    >
                      <div className="liquid-effect" style={{ opacity: 0.3 }} />
                      <FiEdit2 size={32} color="#fff" style={{ filter: 'drop-shadow(0 2px 8px #0004)', zIndex: 1 }} />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ scale: 1.1, boxShadow: "0 28px 56px rgba(255,107,107,0.4)" }}
                      onClick={() => { onDelete(wish); setShowAction(false); }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF6B6B 0%, #FFB5D8 100%)',
                        boxShadow: '0 12px 48px rgba(255,107,107,0.4)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      aria-label="Delete"
                    >
                      <div className="liquid-effect" style={{ opacity: 0.3 }} />
                      <FiTrash2 size={32} color="#fff" style={{ filter: 'drop-shadow(0 2px 8px #0004)', zIndex: 1 }} />
                    </motion.button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    style={{
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 18,
                      textShadow: '0 2px 16px #0008',
                      marginTop: 16,
                      letterSpacing: 0.5,
                      fontFamily: 'Nexus Sherif, Playfair Display, serif',
                    }}
                  >
                    Edit or Delete
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Navigation Controls - Fade out when action menu is open */}
      <AnimatePresence>
        {!showAction && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 40,
            }}
          >
            {/* Left Arrow */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.2 }}
              onClick={handlePrevious}
              className="glass-button"
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: theme.colors.glass,
                backdropFilter: theme.blur.md,
                WebkitBackdropFilter: theme.blur.md,
                border: `1px solid ${theme.colors.borderLight}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                boxShadow: theme.shadows.glass,
              }}
            >
              <FiChevronLeft size={24} color={theme.colors.text.primary} />
            </motion.button>

            {/* Page Indicators */}
            <div style={{
              display: 'flex',
              gap: 10,
            }}>
              {wishes.map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: idx === currentIndex ? 1.3 : 1 }}
                  style={{
                    width: idx === currentIndex ? 28 : 10,
                    height: 10,
                    borderRadius: 5,
                    background: idx === currentIndex
                      ? getCategoryGradient(wishes[currentIndex].category)
                      : theme.colors.border,
                    transition: 'all 0.3s ease',
                    boxShadow: idx === currentIndex ? theme.shadows.glow : 'none',
                  }}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.2 }}
              onClick={handleNext}
              className="glass-button"
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: theme.colors.glass,
                backdropFilter: theme.blur.md,
                WebkitBackdropFilter: theme.blur.md,
                border: `1px solid ${theme.colors.borderLight}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                boxShadow: theme.shadows.glass,
              }}
            >
              <FiChevronRight size={24} color={theme.colors.text.primary} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Bottom Navigation Component (S25 Ultra Optimized)
const BottomNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: <FiHome />, label: 'Home' },
    { id: 'search', icon: <FiSearch />, label: 'Search' },
    { id: 'profile', icon: <FiUser />, label: 'Profile' },
  ];

  return (
    <motion.div 
      variants={slideUp}
      initial="hidden"
      animate="visible"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: theme.colors.glass,
        backdropFilter: theme.blur.lg,
        WebkitBackdropFilter: theme.blur.lg,
        borderTop: `1px solid ${theme.colors.borderLight}`,
        paddingBottom: 'env(safe-area-inset-bottom)',
        zIndex: 100,
        boxShadow: theme.shadows.glass,
      }}
    >
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '8px 0',
        }}
      >
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            variants={itemFade}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === tab.id ? theme.colors.accent.primary : theme.colors.text.tertiary,
              fontSize: 22,
              WebkitTapHighlightColor: 'transparent',
              transition: 'all 0.2s ease',
              minHeight: 64,
            }}
          >
            <div style={{
              padding: 8,
              borderRadius: 14,
              background: activeTab === tab.id 
                ? `linear-gradient(135deg, ${theme.colors.accent.primary}20 0%, ${theme.colors.accent.secondary}20 100%)`
                : 'transparent',
              transition: 'all 0.2s ease',
            }}>
              {tab.icon}
            </div>
            <span style={{ 
              fontSize: 12, 
              fontWeight: 600,
              fontFamily: 'Nexus Sherif, Playfair Display, serif',
            }}>
              {tab.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Updated Floating Action Button Component (S25 Ultra)
const FloatingActionButton = ({ onClick }) => (
  <motion.button 
    className="fab-liquid" 
    onClick={onClick} 
    aria-label="Add Wish"
    variants={fabEntry}
    initial="hidden"
    animate="visible"
    whileHover={{ scale: 1.1, boxShadow: "0 28px 56px rgba(91,91,214,0.4)" }}
    whileTap={{ scale: 0.9 }}
    style={{
      width: 72,
      height: 72,
      borderRadius: '50%',
      background: theme.colors.gradient.ocean,
      boxShadow: theme.shadows.glassLg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      bottom: 100,
      right: 24,
      zIndex: 200,
      border: 'none',
      cursor: 'pointer',
      overflow: 'hidden',
    }}
  >
    <div className="liquid-effect" />
    <FiPlus className="fab-icon" size={32} color="white" style={{ zIndex: 1 }} />
  </motion.button>
);

// Create/Edit Wish Modal (S25 Ultra Optimized)
const CreateWishModal = ({ categories, onSave, onClose, initial, isEdit }) => {
  const [formData, setFormData] = useState({
    content: initial?.content || "",
    category: initial?.category || categories[0],
    notes: initial?.notes || "",
    media: initial?.media || "",
    mediaType: initial?.mediaType || "",
    reviews: initial?.reviews || [],
  });
  const [mediaObj, setMediaObj] = useState(null);

  const handleMediaChange = (obj) => {
    setMediaObj(obj);
    setFormData(f => ({ ...f, media: obj.url, mediaType: obj.type }));
  };

  const handleMediaRemove = () => {
    setMediaObj(null);
    setFormData(f => ({ ...f, media: "", mediaType: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let wish = {
      ...formData,
      id: initial?.id || Date.now().toString(),
      created: initial?.created || new Date(),
      completed: initial?.completed || false,
      type: initial?.type || "experience",
    };
    if (mediaObj && mediaObj.file) {
      // For demo, just use object URL. In real app, upload to server.
      wish.media = mediaObj.url;
      wish.mediaType = mediaObj.type;
    }
    onSave(wish);
  };

  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 0,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-modal"
        style={{
          background: theme.colors.glass,
          backdropFilter: theme.blur.lg,
          WebkitBackdropFilter: theme.blur.lg,
          width: '100%',
          maxHeight: '92vh',
          borderRadius: '28px 28px 0 0',
          overflow: 'hidden',
          boxShadow: theme.shadows.xl,
          border: `1px solid ${theme.colors.borderLight}`,
        }}
      >
        {/* Handle */}
        <div style={{
          padding: '16px 0 8px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 48,
            height: 5,
            background: theme.colors.border,
            borderRadius: 3,
          }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 28px 24px',
        }}>
          <motion.h2 
            variants={itemFade} 
            initial="hidden" 
            animate="visible"
            style={{ 
              fontSize: 26, 
              fontWeight: 800,
              fontFamily: 'Nexus Sherif, Playfair Display, serif',
              color: theme.colors.text.primary,
            }}
          >
            {isEdit ? "Edit Wish" : "Add New Wish"}
          </motion.h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 12,
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              borderRadius: theme.radius.md,
              minWidth: 48,
              minHeight: 48,
            }}
          >
            <FiX size={28} />
          </motion.button>
        </div>

        {/* Scrollable Form Container */}
        <div style={{
          overflowY: 'auto',
          maxHeight: 'calc(92vh - 140px)',
          WebkitOverflowScrolling: 'touch',
        }}>
          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            style={{ padding: '0 28px 40px' }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemFade} style={{ marginBottom: 28 }}>
              <label style={{
                display: 'block',
                fontSize: 16,
                fontWeight: 600,
                color: theme.colors.text.secondary,
                marginBottom: 12,
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
              }}>
                Title
              </label>
              <input
                type="text"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="e.g., Visit Japan"
                required
                autoFocus
                className="glass-input"
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  fontSize: 18,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.lg,
                  outline: 'none',
                  WebkitAppearance: 'none',
                  fontFamily: 'Nexus Sherif, Playfair Display, serif',
                  background: theme.colors.glassDark,
                  backdropFilter: theme.blur.sm,
                  color: theme.colors.text.primary,
                  transition: 'all 0.2s ease',
                  minHeight: 56,
                }}
              />
            </motion.div>

            <motion.div variants={itemFade} style={{ marginBottom: 28 }}>
              <label style={{
                display: 'block',
                fontSize: 16,
                fontWeight: 600,
                color: theme.colors.text.secondary,
                marginBottom: 12,
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
              }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="glass-select"
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  fontSize: 18,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.lg,
                  outline: 'none',
                  WebkitAppearance: 'none',
                  background: `${theme.colors.glassDark} url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A7D85' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat`,
                  backgroundPosition: 'right 18px center',
                  backgroundSize: '20px',
                  paddingRight: '52px',
                  fontFamily: 'Nexus Sherif, Playfair Display, serif',
                  backdropFilter: theme.blur.sm,
                  color: theme.colors.text.primary,
                  transition: 'all 0.2s ease',
                  minHeight: 56,
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={itemFade} style={{ marginBottom: 28 }}>
              <label style={{
                display: 'block',
                fontSize: 16,
                fontWeight: 600,
                color: theme.colors.text.secondary,
                marginBottom: 12,
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
              }}>
                Description
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add some notes..."
                rows={4}
                className="glass-textarea"
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  fontSize: 18,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.lg,
                  outline: 'none',
                  resize: 'none',
                  WebkitAppearance: 'none',
                  fontFamily: 'Nexus Sherif, Playfair Display, serif',
                  background: theme.colors.glassDark,
                  backdropFilter: theme.blur.sm,
                  color: theme.colors.text.primary,
                  transition: 'all 0.2s ease',
                  minHeight: 120,
                }}
              />
            </motion.div>

            <MediaPicker
              value={formData.media}
              onChange={handleMediaChange}
              onRemove={handleMediaRemove}
            />

            <motion.button
              type="submit"
              variants={itemFade}
              whileTap={{ scale: 0.95 }}
              className="liquid-button"
              style={{
                width: '100%',
                padding: '20px',
                background: getCategoryGradient(formData.category),
                color: '#fff',
                border: 'none',
                borderRadius: theme.radius.lg,
                fontSize: 19,
                fontWeight: 700,
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
                boxShadow: theme.shadows.md,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 64,
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>{isEdit ? "Save Changes" : "Add Wishlist Card"}</span>
              <div className="liquid-effect" />
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main App Component (S25 Ultra Optimized)
export default function App() {
  const [wishes, setWishes] = useState(initialWishes);
  const [categories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState("Restaurant");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editWish, setEditWish] = useState(null);
  const [activeBottomTab, setActiveBottomTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState({
    name: "Your Name",
    avatar: "",
  });

  // All wishes for search
  const allWishes = useMemo(() => wishes, [wishes]);
  
  // Search functionality
  const searchedWishes = useMemo(() => {
    if (!searchQuery) return allWishes;
    const q = searchQuery.toLowerCase();
    return allWishes.filter(wish =>
      wish.content.toLowerCase().includes(q) ||
      (wish.notes && wish.notes.toLowerCase().includes(q)) ||
      (wish.tags && wish.tags.some(tag => tag.toLowerCase().includes(q))) ||
      (wish.category && wish.category.toLowerCase().includes(q))
    );
  }, [searchQuery, allWishes]);

  // Filter wishes by category
  const filteredWishes = useMemo(() => {
    return wishes.filter(wish => wish.category === selectedCategory);
  }, [wishes, selectedCategory]);

  // Stats calculation
  const completedWishes = wishes.filter(w => w.completed);
  const totalWishes = wishes.length;
  const completedCount = completedWishes.length;
  const mostPopularCategory = useMemo(() => {
    if (!wishes.length) return '';
    const freq = {};
    wishes.forEach(w => { freq[w.category] = (freq[w.category] || 0) + 1; });
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  }, [wishes]);

  // Handlers
  const handleAddWish = (wishData) => {
    setWishes([...wishes, wishData]);
    setShowAddModal(false);
    if (wishData.category) {
      setSelectedCategory(wishData.category);
    }
  };

  const handleEditWish = (wishData) => {
    setWishes(wishes.map(w => w.id === wishData.id ? wishData : w));
    setShowEditModal(false);
    setEditWish(null);
  };

  const handleDeleteWish = (wish) => {
    setWishes(wishes.filter(w => w.id !== wish.id));
  };

  const handleCardClick = (wish) => {
    // Handle card click - could open detail view
    console.log('Card clicked:', wish);
  };

  const handleBottomTabChange = (tab) => {
    setActiveBottomTab(tab);
  };

  return (
    <motion.div 
      variants={pageFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ 
        minHeight: '100vh', 
        background: theme.colors.bg,
        paddingBottom: 90,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
    >
      {/* Header - Only show on home tab */}
      {activeBottomTab === 'home' && (
        <motion.header 
          variants={slideDown}
          initial="hidden"
          animate="visible"
          className="app-header"
          style={{
            position: 'sticky',
            top: 0,
            background: theme.colors.glass,
            backdropFilter: theme.blur.lg,
            WebkitBackdropFilter: theme.blur.lg,
            borderBottom: `1px solid ${theme.colors.border}`,
            zIndex: 50,
            boxShadow: theme.shadows.sm,
          }}
        >
          <div style={{
            padding: '20px 28px',
            textAlign: 'center',
          }}>
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
              style={{
                fontSize: 30,
                fontWeight: 800,
                background: theme.colors.gradient.ocean,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 0,
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
              }}
            >
              Wishli
            </motion.h1>
          </div>

          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </motion.header>
      )}

      {/* Main Content */}
      <main>
        {activeBottomTab === 'home' && (
          filteredWishes.length === 0 ? (
            <motion.div 
              variants={slideUp}
              initial="hidden"
              animate="visible"
              style={{
                textAlign: 'center',
                padding: '140px 24px',
                color: theme.colors.text.tertiary,
              }}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                style={{ fontSize: 72, marginBottom: 24, opacity: 0.15 }}
              >
                ×
              </motion.div>
              <motion.p 
                variants={itemFade}
                style={{ 
                  fontSize: 20, 
                  marginBottom: 36,
                  fontFamily: 'Nexus Sherif, Playfair Display, serif',
                }}
              >
                No wishes in {selectedCategory} yet
              </motion.p>
              <motion.button
                variants={itemFade}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowAddModal(true)}
                className="liquid-button"
                style={{
                  padding: '18px 32px',
                  background: getCategoryGradient(selectedCategory),
                  color: '#fff',
                  border: 'none',
                  borderRadius: theme.radius.lg,
                  fontSize: 18,
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  fontFamily: 'Nexus Sherif, Playfair Display, serif',
                  boxShadow: theme.shadows.md,
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 56,
                }}
              >
                <FiPlus size={20} />
                Add Your First Wish
                <div className="liquid-effect" />
              </motion.button>
            </motion.div>
          ) : (
            <FannedCardStack
              wishes={filteredWishes}
              onCardClick={handleCardClick}
              onEdit={(wish) => {
                setEditWish(wish);
                setShowEditModal(true);
              }}
              onDelete={handleDeleteWish}
            />
          )
        )}

        {activeBottomTab === 'search' && (
          <motion.div 
            variants={slideUp}
            initial="hidden"
            animate="visible"
            style={{ padding: 28 }}
          >
            <motion.div 
              variants={itemFade}
              className="search-container" 
              style={{ marginBottom: 28 }}
            >
              <input
                className="search-input glass-input"
                type="text"
                placeholder="Search wishes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  background: theme.colors.glass,
                  backdropFilter: theme.blur.sm,
                  border: `1px solid ${theme.colors.border}`,
                  fontSize: 18,
                  padding: '18px 24px 18px 60px',
                  minHeight: 56,
                }}
              />
              <FiSearch className="search-icon" size={20} />
            </motion.div>
            {searchedWishes.length === 0 ? (
              <motion.div 
                variants={itemFade}
                className="empty-state"
              >
                <div className="empty-state-icon">×</div>
                <div className="empty-state-title">No results</div>
                <div className="empty-state-description">Try a different keyword.</div>
              </motion.div>
            ) : (
              <motion.div 
                className="wishes-list"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {searchedWishes.map(wish => (
                  <motion.div
                    className="wish-list-item glass-card-mini"
                    key={wish.id}
                    variants={itemFade}
                    onClick={() => handleCardClick(wish)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: theme.colors.glass,
                      backdropFilter: theme.blur.sm,
                      border: `1px solid ${theme.colors.borderLight}`,
                      padding: '20px 24px',
                      minHeight: 80,
                    }}
                  >
                    {wish.media ? (
                      wish.mediaType === "video" ? (
                        <video
                          className="wish-list-thumbnail"
                          src={wish.media}
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{ objectFit: 'cover', width: 56, height: 56 }}
                        />
                      ) : (
                        <img
                          className="wish-list-thumbnail"
                          src={wish.media}
                          alt={wish.content}
                          style={{ objectFit: 'cover', width: 56, height: 56 }}
                        />
                      )
                    ) : (
                      <div className="wish-list-thumbnail" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: getCategoryGradient(wish.category),
                        color: 'white',
                        width: 56,
                        height: 56,
                        fontSize: 20,
                      }}>
                        {getTypeIcon(wish.type)}
                      </div>
                    )}
                    <div className="wish-list-content">
                      <div className="wish-list-title" style={{ fontSize: 18 }}>{wish.content}</div>
                      <div className="wish-list-meta" style={{ fontSize: 15 }}>
                        <span>{wish.category}</span>
                        <span>{formatDate(wish.created)}</span>
                      </div>
                    </div>
                    {wish.completed && (
                      <FiCheck size={20} color={theme.colors.success} />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {activeBottomTab === 'profile' && (
          <motion.div 
            variants={slideUp}
            initial="hidden"
            animate="visible"
            style={{ padding: 28, maxWidth: 480, margin: '0 auto' }}
          >
            <motion.div 
              variants={itemFade}
              style={{ textAlign: 'center', marginBottom: 36 }}
            >
              <div className="glass-avatar" style={{
                width: 96, height: 96, borderRadius: '50%',
                background: theme.colors.gradient.lavender,
                margin: '0 auto 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 42, color: 'white',
                boxShadow: theme.shadows.glassLg,
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
              }}>
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" style={{ width: '100%', borderRadius: '50%' }} />
                ) : (
                  user.name[0]
                )}
              </div>
              <input
                style={{
                  fontSize: 24, fontWeight: 700, textAlign: 'center',
                  border: 'none', background: 'transparent', outline: 'none', width: '100%',
                  fontFamily: 'Nexus Sherif, Playfair Display, serif',
                  color: theme.colors.text.primary,
                }}
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
              />
            </motion.div>
            
            <motion.div 
              className="stats-container" 
              style={{ marginBottom: 36 }}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="stat-card glass-card-mini"
                variants={itemFade}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: theme.colors.glass,
                  backdropFilter: theme.blur.sm,
                  border: `1px solid ${theme.colors.borderLight}`,
                  padding: 32,
                }}
              >
                <div className="stat-value" style={{ 
                  background: theme.colors.gradient.ocean,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: 40,
                }}>
                  {totalWishes}
                </div>
                <div className="stat-label" style={{ fontSize: 17 }}>Total Wishes</div>
              </motion.div>
              <motion.div 
                className="stat-card glass-card-mini"
                variants={itemFade}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: theme.colors.glass,
                  backdropFilter: theme.blur.sm,
                  border: `1px solid ${theme.colors.borderLight}`,
                  padding: 32,
                }}
              >
                <div className="stat-value" style={{ 
                  background: theme.colors.gradient.mint,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: 40,
                }}>
                  {completedCount}
                </div>
                <div className="stat-label" style={{ fontSize: 17 }}>Completed</div>
              </motion.div>
              <motion.div 
                className="stat-card glass-card-mini"
                variants={itemFade}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: theme.colors.glass,
                  backdropFilter: theme.blur.sm,
                  border: `1px solid ${theme.colors.borderLight}`,
                  padding: 32,
                }}
              >
                <div className="stat-value" style={{ 
                  fontSize: 28,
                  background: theme.colors.gradient.sunset,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {mostPopularCategory || '-'}
                </div>
                <div className="stat-label" style={{ fontSize: 17 }}>Top Category</div>
              </motion.div>
            </motion.div>
            
            <motion.h3 
              variants={itemFade}
              style={{ 
                fontSize: 18, fontWeight: 700, marginBottom: 16,
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
                color: theme.colors.text.primary,
              }}
            >
              Completed Wishes
            </motion.h3>
            {completedWishes.length === 0 ? (
              <motion.div 
                variants={itemFade}
                className="empty-state-description"
                style={{ fontSize: 17 }}
              >
                No completed wishes yet.
              </motion.div>
            ) : (
              <motion.div 
                className="wishes-list"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {completedWishes.map(wish => (
                  <motion.div 
                    className="wish-list-item glass-card-mini" 
                    key={wish.id}
                    variants={itemFade}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      background: theme.colors.glass,
                      backdropFilter: theme.blur.sm,
                      border: `1px solid ${theme.colors.borderLight}`,
                      padding: '20px 24px',
                      minHeight: 80,
                    }}
                  >
                    {wish.media ? (
                      wish.mediaType === "video" ? (
                        <video 
                          className="wish-list-thumbnail" 
                          src={wish.media}
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{ width: 56, height: 56 }}
                        />
                      ) : (
                        <img className="wish-list-thumbnail" src={wish.media} alt={wish.content} style={{ width: 56, height: 56 }} />
                      )
                    ) : (
                      <div className="wish-list-thumbnail" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: getCategoryGradient(wish.category),
                        color: 'white',
                        width: 56,
                        height: 56,
                        fontSize: 20,
                      }}>
                        {getTypeIcon(wish.type)}
                      </div>
                    )}
                    <div className="wish-list-content">
                      <div className="wish-list-title" style={{ fontSize: 18 }}>{wish.content}</div>
                      <div className="wish-list-meta" style={{ fontSize: 15 }}>
                        <span>{wish.category}</span>
                        <span>{formatDate(wish.completedDate || wish.created)}</span>
                      </div>
                    </div>
                    <button
                      style={{ 
                        background: 'none', border: 'none', 
                        color: theme.colors.warning, fontSize: 20,
                        cursor: 'pointer', padding: 12,
                        minWidth: 48, minHeight: 48,
                      }}
                      onClick={() => setWishes(wishes.map(w => 
                        w.id === wish.id ? { ...w, completed: false } : w
                      ))}
                      title="Mark as incomplete"
                    >
                      <FiX />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeBottomTab}
        onTabChange={handleBottomTabChange}
      />

      {/* Floating Action Button - Only show on home tab */}
      {activeBottomTab === 'home' && (
        <FloatingActionButton onClick={() => setShowAddModal(true)} />
      )}

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <CreateWishModal
            categories={categories}
            onSave={handleAddWish}
            onClose={() => setShowAddModal(false)}
          />
        )}
        {showEditModal && editWish && (
          <CreateWishModal
            categories={categories}
            onSave={handleEditWish}
            onClose={() => {
              setShowEditModal(false);
              setEditWish(null);
            }}
            initial={editWish}
            isEdit
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
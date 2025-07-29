import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSearch,
  FiUser,
  FiX,
  FiCheck,
  FiMapPin,
  FiTag,
  FiBookmark,
  FiHeart,
  FiVideo,
  FiMusic,
  FiStar,
  FiTrendingUp,
  FiFolder,
} from "react-icons/fi";

// Enhanced theme with mymind-inspired colors and liquid glass effects
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
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
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

// Enhanced sample data with more items
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

// Category Tabs Component (Optimized for S25)
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
    <div
      ref={scrollRef}
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
          whileTap={{ scale: 0.95 }}
          style={{
            border: 'none',
            background: 'none',
            fontWeight: selected === cat ? 700 : 500,
            borderBottom: selected === cat ? `3px solid ${theme.colors.accent.primary}` : '3px solid transparent',
            color: selected === cat ? theme.colors.text.primary : theme.colors.text.tertiary,
            padding: '16px 20px',
            fontSize: 15,
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            scrollSnapAlign: 'start',
            WebkitTapHighlightColor: 'transparent',
            fontFamily: 'Nexus Sherif, Playfair Display, serif',
          }}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
};

// --- FannedCardStack with improved glass overlay and fixed overlay position ---
const FannedCardStack = ({ wishes, onCardClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [wishes.length, isAnimating]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % wishes.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [wishes.length, isAnimating]);

  // Touch handling for swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  const getCardStyle = (index, wishIndex) => {
    const diff = (wishIndex - currentIndex + wishes.length) % wishes.length;
    const adjustedDiff = diff > wishes.length / 2 ? diff - wishes.length : diff;

    const isActive = adjustedDiff === 0;
    const scale = 1 - Math.abs(adjustedDiff) * 0.05;
    const rotate = adjustedDiff * 6;
    const translateX = adjustedDiff * 55;
    const translateY = Math.abs(adjustedDiff) * 15;
    const zIndex = wishes.length - Math.abs(adjustedDiff);
    const opacity = 1 - Math.abs(adjustedDiff) * 0.2;

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
      transition: isAnimating ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
      cursor: isActive ? 'pointer' : 'default',
      pointerEvents: isActive ? 'auto' : 'none',
      willChange: 'transform',
      filter: isActive ? 'none' : 'brightness(0.95)',
    };
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      padding: '40px 20px 140px',
      minHeight: 600,
    }}>
      {/* Cards Container */}
      <div
        style={{
          position: 'relative',
          height: 500,
          maxWidth: 320,
          margin: '0 auto',
          perspective: '1000px',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {wishes.map((wish, idx) => (
          <div
            key={wish.id}
            style={getCardStyle(currentIndex, idx)}
            onClick={() => idx === currentIndex && onCardClick(wish)}
          >
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="wishli-fancy-card"
              style={{
                width: 280,
                height: 467,
                borderRadius: 28,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: theme.shadows.glassLg,
                background: getCategoryGradient(wish.category),
                WebkitTapHighlightColor: 'transparent',
                border: `1.5px solid ${theme.colors.borderLight}`,
                transition: 'box-shadow 0.3s',
              }}
            >
              {/* Full Image Fill */}
              {wish.media ? (
                <img
                  src={wish.media}
                  alt={wish.content}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    transition: 'transform 0.5s cubic-bezier(.4,2,.6,1)',
                    filter: wish.completed ? 'grayscale(0.7) blur(1px)' : 'none',
                  }}
                  className="wishli-card-img"
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: getCategoryGradient(wish.category),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 80,
                    color: 'rgba(255,255,255,0.8)',
                    fontWeight: 300,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  {getTypeIcon(wish.type)}
                </div>
              )}

              {/* --- GLASSMORPHIC TEXT OVERLAY (IMPROVED) --- */}
              <div
                className="wishli-card-glass"
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 32,
                  transform: 'translateX(-50%)',
                  minWidth: 220,
                  maxWidth: 240,
                  width: '90%',
                  padding: '22px 20px 18px 20px',
                  borderRadius: 22,
                  background: 'rgba(30,40,60,0.32)', // darker, more liquid glass
                  boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
                  backdropFilter: 'blur(22px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  transition: 'bottom 0.3s cubic-bezier(.4,2,.6,1), transform 0.3s cubic-bezier(.4,2,.6,1)',
                  // Fixes overlay "jump" bug on tab switch
                  willChange: 'bottom, transform',
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    marginBottom: 8,
                    lineHeight: 1.3,
                    color: '#fff',
                    textDecoration: wish.completed ? 'line-through' : 'none',
                    fontFamily: 'Nexus Sherif, Playfair Display, serif',
                    textShadow: '0 2px 12px rgba(0,0,0,0.22), 0 1px 0 #fff4',
                    letterSpacing: 0.1,
                  }}
                >
                  {wish.content}
                </div>
                {wish.notes && (
                  <div
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      lineHeight: 1.5,
                      marginBottom: 10,
                      maxHeight: 60,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      fontFamily: 'Nexus Sherif, Playfair Display, serif',
                      textShadow: '0 2px 12px rgba(0,0,0,0.18), 0 1px 0 #fff3',
                    }}
                  >
                    {wish.notes}
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 12,
                    color: '#fff',
                    fontFamily: 'Nexus Sherif, Playfair Display, serif',
                    marginTop: 2,
                    textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      background: 'rgba(255,255,255,0.10)',
                      backdropFilter: 'blur(6px)',
                      borderRadius: 10,
                      padding: '4px 10px',
                      border: '1px solid rgba(255,255,255,0.13)',
                      color: '#fff',
                      textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                    }}
                  >
                    {getTypeIcon(wish.type)}
                    {wish.type}
                  </span>
                  <span>{formatDate(wish.created)}</span>
                </div>
              </div>

              {/* Completed Checkmark */}
              {wish.completed && (
                <div
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: theme.shadows.md,
                    border: `1.5px solid ${theme.colors.success}55`,
                    zIndex: 3,
                    animation: 'wishli-check-pop 0.5s cubic-bezier(.4,2,.6,1)',
                  }}
                >
                  <FiCheck size={18} color={theme.colors.success} />
                </div>
              )}

              {/* Animated Gradient Border */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  borderRadius: 28,
                  pointerEvents: 'none',
                  border: '2.5px solid transparent',
                  background: `linear-gradient(120deg, #fff0 60%, ${theme.colors.accent.primary} 100%) border-box`,
                  maskImage: 'linear-gradient(#fff 0 0)',
                  WebkitMaskImage: 'linear-gradient(#fff 0 0)',
                  animation: 'wishli-gradient-border 3s linear infinite',
                }}
              />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Navigation Controls - Lowered */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 32,
      }}>
        {/* Left Arrow */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
          className="glass-button"
          style={{
            width: 48,
            height: 48,
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
          <FiChevronLeft size={20} color={theme.colors.text.primary} />
        </motion.button>

        {/* Page Indicators */}
        <div style={{
          display: 'flex',
          gap: 8,
        }}>
          {wishes.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
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
          onClick={handleNext}
          className="glass-button"
          style={{
            width: 48,
            height: 48,
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
          <FiChevronRight size={20} color={theme.colors.text.primary} />
        </motion.button>
      </div>
    </div>
  );
};

// Bottom Navigation Component - Modified with narrower height
const BottomNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: <FiHome />, label: 'Home' },
    { id: 'search', icon: <FiSearch />, label: 'Search' },
    { id: 'profile', icon: <FiUser />, label: 'Profile' },
  ];

  return (
    <div style={{
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
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '6px 0',
      }}>
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === tab.id ? theme.colors.accent.primary : theme.colors.text.tertiary,
              fontSize: 20,
              WebkitTapHighlightColor: 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{
              padding: 6,
              borderRadius: 12,
              background: activeTab === tab.id 
                ? `linear-gradient(135deg, ${theme.colors.accent.primary}20 0%, ${theme.colors.accent.secondary}20 100%)`
                : 'transparent',
              transition: 'all 0.2s ease',
            }}>
              {tab.icon}
            </div>
            <span style={{ 
              fontSize: 10, 
              fontWeight: 600,
              fontFamily: 'Nexus Sherif, Playfair Display, serif',
            }}>
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Updated Floating Action Button Component with liquid glass effect
const FloatingActionButton = ({ onClick }) => (
  <motion.button 
    className="fab-liquid" 
    onClick={onClick} 
    aria-label="Add Wish"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: theme.colors.gradient.ocean,
      boxShadow: theme.shadows.glassLg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      bottom: 90,
      right: 20,
      zIndex: 200,
      border: 'none',
      cursor: 'pointer',
      overflow: 'hidden',
    }}
  >
    <div className="liquid-effect" />
    <FiPlus className="fab-icon" size={28} color="white" style={{ zIndex: 1 }} />
  </motion.button>
);

// Create Wish Modal (Optimized for S25)
const CreateWishModal = ({ categories, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    content: "",
    category: categories[0],
    notes: "",
    media: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: Date.now().toString(),
      created: new Date(),
      completed: false,
      type: "experience",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 0,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-modal"
        style={{
          background: theme.colors.glass,
          backdropFilter: theme.blur.lg,
          WebkitBackdropFilter: theme.blur.lg,
          width: '100%',
          maxHeight: '85vh',
          borderRadius: '24px 24px 0 0',
          overflow: 'hidden',
          boxShadow: theme.shadows.xl,
          border: `1px solid ${theme.colors.borderLight}`,
        }}
      >
        {/* Handle */}
        <div style={{
          padding: '12px 0 6px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 40,
            height: 4,
            background: theme.colors.border,
            borderRadius: 2,
          }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px 20px',
        }}>
          <h2 style={{ 
            fontSize: 22, 
            fontWeight: 800,
            fontFamily: 'Nexus Sherif, Playfair Display, serif',
            color: theme.colors.text.primary,
          }}>
            Add New Wish
          </h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 10,
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <FiX size={24} />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '0 24px 36px' }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: theme.colors.text.secondary,
              marginBottom: 8,
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
                padding: '14px 16px',
                fontSize: 16,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.lg,
                outline: 'none',
                WebkitAppearance: 'none',
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
                background: theme.colors.glassDark,
                backdropFilter: theme.blur.sm,
                color: theme.colors.text.primary,
                transition: 'all 0.2s ease',
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: theme.colors.text.secondary,
              marginBottom: 8,
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
                padding: '14px 16px',
                fontSize: 16,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.lg,
                outline: 'none',
                WebkitAppearance: 'none',
                background: `${theme.colors.glassDark} url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A7D85' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat`,
                backgroundPosition: 'right 14px center',
                backgroundSize: '18px',
                paddingRight: '44px',
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
                backdropFilter: theme.blur.sm,
                color: theme.colors.text.primary,
                transition: 'all 0.2s ease',
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: theme.colors.text.secondary,
              marginBottom: 8,
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
                padding: '14px 16px',
                fontSize: 16,
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
              }}
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            className="liquid-button"
            style={{
              width: '100%',
              padding: '16px',
              background: getCategoryGradient(formData.category),
              color: '#fff',
              border: 'none',
              borderRadius: theme.radius.lg,
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              fontFamily: 'Nexus Sherif, Playfair Display, serif',
              boxShadow: theme.shadows.md,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Add Wishlist Card</span>
            <div className="liquid-effect" />
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Main App Component
export default function App() {
  const [wishes, setWishes] = useState(initialWishes);
  const [categories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState("Restaurant");
  const [showAddModal, setShowAddModal] = useState(false);
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

  const handleCardClick = (wish) => {
    // Handle card click - could open detail view
    console.log('Card clicked:', wish);
  };

  const handleBottomTabChange = (tab) => {
    setActiveBottomTab(tab);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme.colors.bg,
      paddingBottom: 80,
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none',
    }}>
      {/* Header - Only show on home tab */}
      {activeBottomTab === 'home' && (
        <header style={{
          position: 'sticky',
          top: 0,
          background: theme.colors.glass,
          backdropFilter: theme.blur.lg,
          WebkitBackdropFilter: theme.blur.lg,
          borderBottom: `1px solid ${theme.colors.border}`,
          zIndex: 50,
          boxShadow: theme.shadows.sm,
        }}>
          <div style={{
            padding: '16px 24px',
            textAlign: 'center',
          }}>
            <h1 style={{
              fontSize: 26,
              fontWeight: 800,
              background: theme.colors.gradient.ocean,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 0,
              fontFamily: 'Nexus Sherif, Playfair Display, serif',
            }}>
              Wishli
            </h1>
          </div>

          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </header>
      )}

      {/* Main Content */}
      <main>
        {activeBottomTab === 'home' && (
          filteredWishes.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '120px 20px',
              color: theme.colors.text.tertiary,
            }}>
              <div style={{ fontSize: 64, marginBottom: 20, opacity: 0.15 }}>×</div>
              <p style={{ 
                fontSize: 18, 
                marginBottom: 32,
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
              }}>
                No wishes in {selectedCategory} yet
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="liquid-button"
                style={{
                  padding: '14px 28px',
                  background: getCategoryGradient(selectedCategory),
                  color: '#fff',
                  border: 'none',
                  borderRadius: theme.radius.lg,
                  fontSize: 16,
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  fontFamily: 'Nexus Sherif, Playfair Display, serif',
                  boxShadow: theme.shadows.md,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <FiPlus size={18} />
                Add Your First Wish
                <div className="liquid-effect" />
              </motion.button>
            </div>
          ) : (
            <FannedCardStack
              wishes={filteredWishes}
              onCardClick={handleCardClick}
            />
          )
        )}

        {activeBottomTab === 'search' && (
          <div style={{ padding: 24 }}>
            <div className="search-container" style={{ marginBottom: 24 }}>
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
                }}
              />
              <FiSearch className="search-icon" />
            </div>
            {searchedWishes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">×</div>
                <div className="empty-state-title">No results</div>
                <div className="empty-state-description">Try a different keyword.</div>
              </div>
            ) : (
              <div className="wishes-list">
                {searchedWishes.map(wish => (
                  <motion.div
                    className="wish-list-item glass-card-mini"
                    key={wish.id}
                    onClick={() => handleCardClick(wish)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: theme.colors.glass,
                      backdropFilter: theme.blur.sm,
                      border: `1px solid ${theme.colors.borderLight}`,
                    }}
                  >
                    {wish.media ? (
                      <img
                        className="wish-list-thumbnail"
                        src={wish.media}
                        alt={wish.content}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="wish-list-thumbnail" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: getCategoryGradient(wish.category),
                        color: 'white',
                      }}>
                        {getTypeIcon(wish.type)}
                      </div>
                    )}
                    <div className="wish-list-content">
                      <div className="wish-list-title">{wish.content}</div>
                      <div className="wish-list-meta">
                        <span>{wish.category}</span>
                        <span>{formatDate(wish.created)}</span>
                      </div>
                    </div>
                    {wish.completed && (
                      <FiCheck size={18} color={theme.colors.success} />
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeBottomTab === 'profile' && (
          <div style={{ padding: 24, maxWidth: 400, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div className="glass-avatar" style={{
                width: 80, height: 80, borderRadius: '50%',
                background: theme.colors.gradient.lavender,
                margin: '0 auto 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, color: 'white',
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
                  fontSize: 20, fontWeight: 700, textAlign: 'center',
                  border: 'none', background: 'transparent', outline: 'none', width: '100%',
                  fontFamily: 'Nexus Sherif, Playfair Display, serif',
                  color: theme.colors.text.primary,
                }}
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
              />
            </div>
            
            <div className="stats-container" style={{ marginBottom: 32 }}>
              <motion.div 
                className="stat-card glass-card-mini"
                whileHover={{ scale: 1.05 }}
                style={{
                  background: theme.colors.glass,
                  backdropFilter: theme.blur.sm,
                  border: `1px solid ${theme.colors.borderLight}`,
                }}
              >
                <div className="stat-value" style={{ 
                  background: theme.colors.gradient.ocean,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {totalWishes}
                </div>
                <div className="stat-label">Total Wishes</div>
              </motion.div>
              <motion.div 
                className="stat-card glass-card-mini"
                whileHover={{ scale: 1.05 }}
                style={{
                  background: theme.colors.glass,
                  backdropFilter: theme.blur.sm,
                  border: `1px solid ${theme.colors.borderLight}`,
                }}
              >
                <div className="stat-value" style={{ 
                  background: theme.colors.gradient.mint,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {completedCount}
                </div>
                <div className="stat-label">Completed</div>
              </motion.div>
              <motion.div 
                className="stat-card glass-card-mini"
                whileHover={{ scale: 1.05 }}
                style={{
                  background: theme.colors.glass,
                  backdropFilter: theme.blur.sm,
                  border: `1px solid ${theme.colors.borderLight}`,
                }}
              >
                <div className="stat-value" style={{ 
                  fontSize: 24,
                  background: theme.colors.gradient.sunset,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {mostPopularCategory || '-'}
                </div>
                <div className="stat-label">Top Category</div>
              </motion.div>
            </div>
            
            <h3 style={{ 
              fontSize: 16, fontWeight: 700, marginBottom: 12,
              fontFamily: 'Nexus Sherif, Playfair Display, serif',
              color: theme.colors.text.primary,
            }}>
              Completed Wishes
            </h3>
            {completedWishes.length === 0 ? (
              <div className="empty-state-description">No completed wishes yet.</div>
            ) : (
              <div className="wishes-list">
                {completedWishes.map(wish => (
                  <motion.div 
                    className="wish-list-item glass-card-mini" 
                    key={wish.id}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      background: theme.colors.glass,
                      backdropFilter: theme.blur.sm,
                      border: `1px solid ${theme.colors.borderLight}`,
                    }}
                  >
                    {wish.media ? (
                      <img className="wish-list-thumbnail" src={wish.media} alt={wish.content} />
                    ) : (
                      <div className="wish-list-thumbnail" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: getCategoryGradient(wish.category),
                        color: 'white',
                      }}>
                        {getTypeIcon(wish.type)}
                      </div>
                    )}
                    <div className="wish-list-content">
                      <div className="wish-list-title">{wish.content}</div>
                      <div className="wish-list-meta">
                        <span>{wish.category}</span>
                        <span>{formatDate(wish.completedDate || wish.created)}</span>
                      </div>
                    </div>
                    <button
                      style={{ 
                        background: 'none', border: 'none', 
                        color: theme.colors.warning, fontSize: 18,
                        cursor: 'pointer', padding: 8,
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
              </div>
            )}
          </div>
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
      </AnimatePresence>

      {/* CSS for hiding scrollbars and liquid effects */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .liquid-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .liquid-button:hover .liquid-effect,
        .fab-liquid:hover .liquid-effect {
          opacity: 1;
          animation: liquid-pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes liquid-pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(0.8); }
        }
        
        @keyframes wishli-glass-fadein {
          from { opacity: 0; transform: translateY(30px) scale(0.95);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        
        @keyframes wishli-check-pop {
          0% { transform: scale(0.7); opacity: 0;}
          60% { transform: scale(1.2);}
          100% { transform: scale(1); opacity: 1;}
        }
        
        @keyframes wishli-gradient-border {
          0% { filter: hue-rotate(0deg);}
          100% { filter: hue-rotate(360deg);}
        }
        
        .wishli-fancy-card:hover .wishli-card-img {
          transform: scale(1.04) rotate(-1deg);
          filter: brightness(1.08) saturate(1.1);
        }
        
        .glass-card:hover {
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.glassLg};
        }
        
        .glass-button:hover {
          background: ${theme.colors.surface};
          transform: scale(1.05);
        }
        
        .glass-input:focus,
        .glass-select:focus,
        .glass-textarea:focus {
          border-color: ${theme.colors.accent.primary};
          background: ${theme.colors.surface};
        }
      `}</style>
    </div>
  );
}
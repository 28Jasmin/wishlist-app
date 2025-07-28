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

// Enhanced theme with 3D effects
const theme = {
  colors: {
    bg: "#ffffff",
    surface: "#fafafa",
    surfaceHover: "#f5f5f5",
    text: {
      primary: "#1a1a1a",
      secondary: "#6e6e6e",
      tertiary: "#a0a0a0",
    },
    border: "#efefef",
    borderLight: "#f8f8f8",
    accent: "#2a2a2a",
    accentLight: "#e8e8e8",
    success: "#4ade80",
    warning: "#fb923c",
    error: "#f87171",
    info: "#60a5fa",
  },
  shadows: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.03)",
    sm: "0 2px 4px rgba(0, 0, 0, 0.04)",
    md: "0 4px 8px rgba(0, 0, 0, 0.06)",
    lg: "0 8px 16px rgba(0, 0, 0, 0.08)",
    xl: "0 16px 32px rgba(0, 0, 0, 0.10)",
    "3d": "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 40px rgba(0, 0, 0, 0.05)",
    "text3d": "1px 1px 2px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.08)",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    xl: "20px",
    full: "9999px",
  },
  transitions: {
    fast: "120ms ease",
    base: "180ms ease",
    slow: "280ms ease",
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

// Sample data with categories
const initialWishes = [
  {
    id: "1",
    content: "Canada",
    type: "travel",
    category: "Adventure",
    media: "https://images.unsplash.com/photo-1609963095806-c6b65827e8d0?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 0, 15),
    tags: ["nature", "mountains", "hiking"],
    notes: "Lorem ipsum logum et amet, consectetur du. Visit Banff National Park and see the Northern Lights.",
    location: "Banff, Canada",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    content: "Skydiving in Dubai",
    type: "experience",
    category: "Adventure",
    media: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 0, 20),
    tags: ["extreme", "dubai", "bucket-list"],
    notes: "Lorem ipsum logum et amet, consectetur du. Jump from 13,000 feet over Palm Jumeirah.",
    priority: "high",
    completed: false,
  },
  {
    id: "3",
    content: "Scuba Diving Great Barrier Reef",
    type: "experience",
    category: "Adventure",
    media: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 5),
    tags: ["ocean", "australia", "diving"],
    notes: "Lorem ipsum logum et amet, consectetur du. Explore the underwater world of coral reefs.",
    priority: "medium",
    completed: false,
  },
  {
    id: "4",
    content: "Northern Lights in Iceland",
    type: "travel",
    category: "Travel",
    media: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 10),
    tags: ["iceland", "aurora", "winter"],
    notes: "Best time: September to March",
    location: "Reykjavik, Iceland",
    priority: "high",
    completed: false,
  },
  {
    id: "5",
    content: "La Bernardin NYC",
    type: "food",
    category: "Restaurant",
    media: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 1, 18),
    tags: ["fine-dining", "seafood", "michelin"],
    notes: "Book 2 months in advance, try the tasting menu",
    priority: "medium",
    completed: false,
  },
  {
    id: "6",
    content: "Watch Dune Part Two",
    type: "movie",
    category: "Movies",
    media: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    mediaType: "image",
    created: new Date(2024, 2, 1),
    tags: ["sci-fi", "epic", "villeneuve"],
    notes: "Watch in IMAX for best experience",
    priority: "medium",
    completed: true,
    completedDate: new Date(2024, 2, 15),
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
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
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
            borderBottom: selected === cat ? '3px solid #2a2a2a' : '3px solid transparent',
            color: selected === cat ? '#2a2a2a' : '#a0a0a0',
            padding: '16px 20px',
            fontSize: 15,
            cursor: 'pointer',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            scrollSnapAlign: 'start',
            WebkitTapHighlightColor: 'transparent',
            fontFamily: 'Nexus Sherif, Playfair Display, serif',
            textShadow: selected === cat ? theme.shadows.text3d : 'none',
          }}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
};

// Enhanced Fanned Card Stack Component with 3:5 ratio
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
              style={{
                width: 280,
                height: 467,
                borderRadius: 24,
                background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                boxShadow: theme.shadows["3d"],
                overflow: 'hidden',
                WebkitTapHighlightColor: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              {/* Card Image */}
              {wish.media ? (
                <div style={{
                  width: '100%',
                  height: 200,
                  background: `url(${wish.media}) center/cover`,
                  position: 'relative',
                }}>
                  {wish.completed && (
                    <div style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: theme.shadows.md,
                    }}>
                      <FiCheck size={16} color={theme.colors.success} />
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  width: '100%',
                  height: 200,
                  background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.surfaceHover})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 60,
                  color: theme.colors.text.tertiary,
                  fontWeight: 300,
                }}>
                  ×
                </div>
              )}
              
              {/* Card Content */}
              <div style={{ padding: '24px' }}>
                <div style={{ 
                  fontWeight: 800, 
                  fontSize: 20, 
                  marginBottom: 12,
                  lineHeight: 1.3,
                  color: wish.completed ? theme.colors.text.tertiary : theme.colors.text.primary,
                  textDecoration: wish.completed ? 'line-through' : 'none',
                  fontFamily: 'Nexus Sherif, Playfair Display, serif',
                  textShadow: theme.shadows.text3d,
                }}>
                  {wish.content}
                </div>
                
                {wish.notes && (
                  <div style={{ 
                    color: theme.colors.text.secondary, 
                    fontSize: 14,
                    lineHeight: 1.6,
                    marginBottom: 16,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    fontFamily: 'Nexus Sherif, Playfair Display, serif',
                  }}>
                    {wish.notes}
                  </div>
                )}
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 12,
                  color: theme.colors.text.tertiary,
                  fontFamily: 'Nexus Sherif, Playfair Display, serif',
                }}>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 6,
                    background: theme.colors.surface,
                    padding: '6px 12px',
                    borderRadius: theme.radius.md,
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
                  }}>
                    {getTypeIcon(wish.type)}
                    {wish.type}
                  </span>
                  <span>{formatDate(wish.created)}</span>
                </div>
              </div>
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
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.05)',
          }}
        >
          <FiChevronLeft size={20} />
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
                background: idx === currentIndex ? theme.colors.accent : theme.colors.border,
                transition: 'all 0.2s ease',
                boxShadow: idx === currentIndex ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.05)',
          }}
        >
          <FiChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

// Bottom Navigation Component - Modified to 3 buttons
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
      background: 'linear-gradient(to top, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95))',
      borderTop: `1px solid ${theme.colors.border}`,
      paddingBottom: 'env(safe-area-inset-bottom)',
      zIndex: 100,
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.04)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 0',
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
              gap: 6,
              padding: '10px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === tab.id ? theme.colors.accent : theme.colors.text.tertiary,
              fontSize: 22,
              WebkitTapHighlightColor: 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{
              padding: 8,
              borderRadius: 12,
              background: activeTab === tab.id ? theme.colors.accentLight : 'transparent',
              transition: 'all 0.2s ease',
            }}>
              {tab.icon}
            </div>
            <span style={{ 
              fontSize: 11, 
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

// Updated Floating Action Button Component with 3D styling
const FloatingActionButton = ({ onClick }) => (
  <button className="fab-3d" onClick={onClick} aria-label="Add Wish">
    <FiPlus className="fab-3d-icon" />
  </button>
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
        background: 'rgba(0, 0, 0, 0.6)',
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
        style={{
          background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
          width: '100%',
          maxHeight: '85vh',
          borderRadius: '24px 24px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.15)',
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
            textShadow: theme.shadows.text3d,
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
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: 16,
                border: `2px solid ${theme.colors.border}`,
                borderRadius: theme.radius.lg,
                outline: 'none',
                WebkitAppearance: 'none',
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
                background: 'white',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
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
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: 16,
                border: `2px solid ${theme.colors.border}`,
                borderRadius: theme.radius.lg,
                outline: 'none',
                WebkitAppearance: 'none',
                background: `white url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat`,
                backgroundPosition: 'right 14px center',
                backgroundSize: '18px',
                paddingRight: '44px',
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
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
              placeholder="Lorem ipsum logum et amet..."
              rows={4}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: 16,
                border: `2px solid ${theme.colors.border}`,
                borderRadius: theme.radius.lg,
                outline: 'none',
                resize: 'none',
                WebkitAppearance: 'none',
                fontFamily: 'Nexus Sherif, Playfair Display, serif',
                background: 'white',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
              }}
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: theme.radius.lg,
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              fontFamily: 'Nexus Sherif, Playfair Display, serif',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            Add Wishlist Card
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
  const [selectedCategory, setSelectedCategory] = useState("Adventure");
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
      background: `linear-gradient(to bottom, ${theme.colors.bg}, ${theme.colors.surface})`,
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
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.98))',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border}`,
          zIndex: 50,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{
            padding: '16px 24px',
            textAlign: 'center',
          }}>
            <h1 style={{
              fontSize: 26,
              fontWeight: 800,
              color: theme.colors.text.primary,
              marginBottom: 0,
              fontFamily: 'Nexus Sherif, Playfair Display, serif',
              textShadow: theme.shadows.text3d,
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
                style={{
                  padding: '14px 28px',
                  background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)',
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
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              >
                <FiPlus size={18} />
                Add Your First Wish
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
                className="search-input"
                type="text"
                placeholder="Search wishes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
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
                  <div
                    className="wish-list-item"
                    key={wish.id}
                    onClick={() => handleCardClick(wish)}
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
                        background: theme.colors.surface,
                        color: theme.colors.text.tertiary,
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
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeBottomTab === 'profile' && (
          <div style={{ padding: 24, maxWidth: 400, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: theme.colors.surface, margin: '0 auto 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, color: theme.colors.text.tertiary,
                border: `2px solid ${theme.colors.border}`,
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
                }}
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
              />
            </div>
            
            <div className="stats-container" style={{ marginBottom: 32 }}>
              <div className="stat-card">
                <div className="stat-value">{totalWishes}</div>
                <div className="stat-label">Total Wishes</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{completedCount}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{mostPopularCategory || '-'}</div>
                <div className="stat-label">Top Category</div>
              </div>
            </div>
            
            <h3 style={{ 
              fontSize: 16, fontWeight: 700, marginBottom: 12,
              fontFamily: 'Nexus Sherif, Playfair Display, serif',
            }}>
              Completed Wishes
            </h3>
            {completedWishes.length === 0 ? (
              <div className="empty-state-description">No completed wishes yet.</div>
            ) : (
              <div className="wishes-list">
                {completedWishes.map(wish => (
                  <div className="wish-list-item" key={wish.id}>
                    {wish.media ? (
                      <img className="wish-list-thumbnail" src={wish.media} alt={wish.content} />
                    ) : (
                      <div className="wish-list-thumbnail" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: theme.colors.surface,
                        color: theme.colors.text.tertiary,
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
                  </div>
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

      {/* CSS for hiding scrollbars */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
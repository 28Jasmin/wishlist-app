import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSearch,
  FiUser,
  FiX,
  FiCheck,
  FiEdit2,
  FiTrash2,
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

// Minimal mymind-style theme for S25 optimization
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
        background: theme.colors.bg,
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        scrollSnapType: 'x mandatory',
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
            fontWeight: selected === cat ? 600 : 400,
            borderBottom: selected === cat ? '2px solid #2a2a2a' : '2px solid transparent',
            color: selected === cat ? '#2a2a2a' : '#a0a0a0',
            padding: '14px 18px',
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            scrollSnapAlign: 'start',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
};

// Fanned Card Stack Component (Optimized for S25)
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
    const translateX = adjustedDiff * 45;
    const translateY = Math.abs(adjustedDiff) * 10;
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
    };
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%',
      padding: '40px 20px 100px',
      minHeight: 450,
    }}>
      {/* Cards Container */}
      <div
        style={{
          position: 'relative',
          height: 340,
          maxWidth: 280,
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
                width: 240,
                height: 320,
                borderRadius: 18,
                background: '#fff',
                boxShadow: theme.shadows.lg,
                overflow: 'hidden',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {/* Card Image */}
              {wish.media ? (
                <div style={{
                  width: '100%',
                  height: 140,
                  background: `url(${wish.media}) center/cover`,
                  position: 'relative',
                }}>
                  {wish.completed && (
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: theme.shadows.sm,
                    }}>
                      <FiCheck size={14} color={theme.colors.success} />
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  width: '100%',
                  height: 140,
                  background: theme.colors.surface,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                  color: theme.colors.text.tertiary,
                  fontWeight: 300,
                }}>
                  ×
                </div>
              )}
              
              {/* Card Content */}
              <div style={{ padding: '18px 20px 16px' }}>
                <div style={{ 
                  fontWeight: 600, 
                  fontSize: 17, 
                  marginBottom: 6,
                  lineHeight: 1.3,
                  color: wish.completed ? theme.colors.text.tertiary : theme.colors.text.primary,
                  textDecoration: wish.completed ? 'line-through' : 'none',
                }}>
                  {wish.content}
                </div>
                
                {wish.notes && (
                  <div style={{ 
                    color: theme.colors.text.secondary, 
                    fontSize: 13,
                    lineHeight: 1.5,
                    marginBottom: 10,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {wish.notes}
                  </div>
                )}
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 11,
                  color: theme.colors.text.tertiary,
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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

      {/* Navigation Controls */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}>
        {/* Left Arrow */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: theme.colors.bg,
            border: `1px solid ${theme.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <FiChevronLeft size={18} />
        </motion.button>

        {/* Page Indicators */}
        <div style={{
          display: 'flex',
          gap: 6,
        }}>
          {wishes.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === currentIndex ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: idx === currentIndex ? theme.colors.accent : theme.colors.border,
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: theme.colors.bg,
            border: `1px solid ${theme.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <FiChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
};

// Bottom Navigation Component
const BottomNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: <FiHome />, label: 'Home' },
    { id: 'search', icon: <FiSearch />, label: 'Search' },
    { id: 'add', icon: <FiPlus />, label: 'Add' },
    { id: 'profile', icon: <FiUser />, label: 'Profile' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: theme.colors.bg,
      borderTop: `1px solid ${theme.colors.border}`,
      paddingBottom: 'env(safe-area-inset-bottom)',
      zIndex: 100,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 0',
      }}>
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => tab.id === 'add' ? onTabChange(tab.id) : null}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 16px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === tab.id ? theme.colors.accent : theme.colors.text.tertiary,
              fontSize: 20,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {tab.icon}
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

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
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 0,
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
          background: theme.colors.bg,
          width: '100%',
          maxHeight: '85vh',
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',
        }}
      >
        {/* Handle */}
        <div style={{
          padding: '10px 0 4px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 36,
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
          padding: '8px 20px 16px',
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Add New Wish</h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 8,
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <FiX size={20} />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '0 20px 32px' }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 500,
              color: theme.colors.text.secondary,
              marginBottom: 6,
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
                padding: '12px 14px',
                fontSize: 16,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                outline: 'none',
                WebkitAppearance: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 500,
              color: theme.colors.text.secondary,
              marginBottom: 6,
            }}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: 16,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                outline: 'none',
                WebkitAppearance: 'none',
                background: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat`,
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px',
                paddingRight: '40px',
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 500,
              color: theme.colors.text.secondary,
              marginBottom: 6,
            }}>
              Description
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Lorem ipsum logum et amet..."
              rows={3}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: 16,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                outline: 'none',
                resize: 'none',
                WebkitAppearance: 'none',
              }}
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '14px',
              background: theme.colors.accent,
              color: '#fff',
              border: 'none',
              borderRadius: theme.radius.md,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
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
  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState("Adventure");
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState('home');

  // Filter wishes by category
  const filteredWishes = useMemo(() => {
    return wishes.filter(wish => wish.category === selectedCategory);
  }, [wishes, selectedCategory]);

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
    if (tab === 'add') {
      setShowAddModal(true);
    }
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
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.colors.border}`,
        zIndex: 50,
      }}>
        <div style={{
          padding: '14px 20px',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: 20,
            fontWeight: 600,
            color: theme.colors.text.primary,
            marginBottom: 2,
          }}>
            Wishli
          </h1>
          <p style={{
            fontSize: 11,
            color: theme.colors.text.tertiary,
            fontWeight: 400,
          }}>
            Use HorizontalPager in Compose for fanning
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </header>

      {/* Main Content */}
      <main>
        {filteredWishes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '100px 20px',
            color: theme.colors.text.tertiary,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.2 }}>×</div>
            <p style={{ fontSize: 15, marginBottom: 24 }}>
              No wishes in {selectedCategory} yet
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              style={{
                padding: '12px 24px',
                background: theme.colors.accent,
                color: '#fff',
                border: 'none',
                borderRadius: theme.radius.md,
                fontSize: 14,
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <FiPlus size={16} />
              Add Your First Wish
            </motion.button>
          </div>
        ) : (
          <FannedCardStack
            wishes={filteredWishes}
            onCardClick={handleCardClick}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeBottomTab}
        onTabChange={handleBottomTabChange}
      />

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
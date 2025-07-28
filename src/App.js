import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMoon,
  FaSun,
  FaCheckCircle,
  FaPlus,
  FaTrash,
  FaEdit,
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaCog,
  FaStar,
  FaPlane,
  FaFilm,
  FaUtensils,
  FaBook,
  FaShoppingBag,
  FaFutbol,
  FaPaintBrush,
  FaSearch,
  FaUser,
  FaBell,
  FaChartBar,
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaComments,
  FaEllipsisH,
  FaFilter,
  FaSort,
  FaCalendarAlt,
  FaLock,
  FaGlobe,
  FaCamera,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaTag,
  FaClock,
  FaUsers,
  FaTrophy,
  FaGift,
  FaMagic,
  FaRocket,
  FaPalette,
  FaStickyNote,
  FaHistory,
  FaDownload,
  FaUpload,
  FaSync,
  FaInfoCircle,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaCheck,
  FaBan,
  FaVolumeUp,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeDown,
  FaVolumeUp as FaVolumeMax,
  FaVolumeMute as FaVolumeNone,
  FaVolumeOff as FaVolumeSilent,
  FaVolumeDown as FaVolumeLow,
} from "react-icons/fa";

// --- Enhanced SVG Animated Background ---
const AnimatedBackground = ({ dark, theme }) => {
  const colors = {
    default: dark ? ["#22223b", "#0f3460"] : ["#FF9A8B", "#FF99AC"],
    ocean: ["#00c9ff", "#92fe9d"],
    sunset: ["#ff7e5f", "#feb47b"],
    forest: ["#134e5e", "#71b280"],
    cosmic: ["#642B73", "#C6426E"],
    neon: ["#12c2e9", "#c471ed", "#f64f59"],
  };

  const gradientColors = colors[theme] || colors.default;

  return (
    <svg
      style={{
        position: "fixed",
        zIndex: 0,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
      width="100vw"
      height="100vh"
    >
      <defs>
        <radialGradient id="bg-grad" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor={gradientColors[0]} />
          <stop offset="100%" stopColor={gradientColors[1]} />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <rect width="100vw" height="100vh" fill="url(#bg-grad)" />
      {/* Floating bubbles */}
      {[...Array(12)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 100 + "%"}
          cy={Math.random() * 100 + "%"}
          r={Math.random() * 30 + 20}
          fill={dark ? "#fff2" : "#fff4"}
          filter="url(#blur)"
          animate={{
            cy: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "mirror",
            delay: Math.random() * 4,
          }}
        />
      ))}
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={`particle-${i}`}
          cx={Math.random() * 100 + "%"}
          cy={Math.random() * 100 + "%"}
          r={Math.random() * 4 + 1}
          fill={dark ? "#fff8" : "#fff"}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </svg>
  );
};

// --- Enhanced Confetti Celebration ---
const Confetti = ({ show, type = "default" }) => {
  const confettiTypes = {
    default: { count: 60, size: [10, 20], colors: ["#FF6B6B", "#4ECDC4", "#FFD166", "#1A535C"] },
    celebration: { count: 100, size: [8, 15], colors: ["#FF6B6B", "#4ECDC4", "#FFD166", "#1A535C", "#9B5DE5"] },
    success: { count: 80, size: [6, 12], colors: ["#4ECDC4", "#1A535C"] },
    premium: { count: 120, size: [5, 25], colors: ["#FFD700", "#FFA500", "#FF6347"] },
  };

  const config = confettiTypes[type] || confettiTypes.default;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 1000,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(config.count)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: config.size[0] + Math.random() * (config.size[1] - config.size[0]),
                height: config.size[0] + Math.random() * (config.size[1] - config.size[0]),
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
                background: config.colors[Math.floor(Math.random() * config.colors.length)],
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              initial={{ y: -100, opacity: 0, scale: 0 }}
              animate={{
                y: [0, 200 + Math.random() * 300],
                opacity: [1, 0],
                scale: [0, 1, 0],
                rotate: [0, Math.random() * 360, Math.random() * 720],
                x: [0, (Math.random() - 0.5) * 200],
              }}
              transition={{
                duration: 2 + Math.random() * 1.5,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Enhanced Toast Notification ---
const Toast = ({ message, icon, show, type = "default", duration = 2200 }) => {
  const toastTypes = {
    default: { bg: "#1A535C", color: "#fff" },
    success: { bg: "#4ECDC4", color: "#fff" },
    error: { bg: "#FF6B6B", color: "#fff" },
    warning: { bg: "#FFD166", color: "#1A535C" },
    info: { bg: "#9B5DE5", color: "#fff" },
    premium: { bg: "linear-gradient(90deg, #FFD700, #FFA500)", color: "#000" },
  };

  const style = toastTypes[type] || toastTypes.default;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          style={{
            position: "fixed",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            background: style.bg,
            color: style.color,
            padding: "16px 32px",
            borderRadius: 32,
            boxShadow: "0 8px 32px #0003",
            zIndex: 1001,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontWeight: 600,
            fontSize: 18,
            maxWidth: "90vw",
            wordBreak: "break-word",
          }}
        >
          {icon}
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Enhanced Category Data ---
const defaultCategories = [
  {
    key: "travel",
    name: "Travel",
    icon: <FaPlane />,
    color: "#4ECDC4",
    description: "Dream destinations and adventures",
    count: 12,
    featured: true,
  },
  {
    key: "movies",
    name: "Movies",
    icon: <FaFilm />,
    color: "#FF6B6B",
    description: "Must-watch films and series",
    count: 8,
  },
  {
    key: "restaurants",
    name: "Restaurants",
    icon: <FaUtensils />,
    color: "#FFD166",
    description: "Delicious dining experiences",
    count: 5,
  },
  {
    key: "books",
    name: "Books",
    icon: <FaBook />,
    color: "#1A535C",
    description: "Books to read and explore",
    count: 15,
  },
  {
    key: "shopping",
    name: "Shopping",
    icon: <FaShoppingBag />,
    color: "#FF9A8B",
    description: "Products and items to buy",
    count: 7,
  },
  {
    key: "sports",
    name: "Sports",
    icon: <FaFutbol />,
    color: "#FF5E7D",
    description: "Sports events and activities",
    count: 3,
  },
  {
    key: "hobbies",
    name: "Hobbies",
    icon: <FaPaintBrush />,
    color: "#9B5DE5",
    description: "Creative and fun activities",
    count: 9,
  },
];

// --- Enhanced Sample Wishes ---
const sampleWishes = {
  travel: [
    {
      id: 1,
      title: "Santorini, Greece",
      description: "Visit the stunning white-washed buildings with blue domes.",
      media:
        "<https://images.unsplash.com/photo-1570077188259-71c05c181d41?auto=format&fit=crop&w=800&q=80>",
      mediaType: "image",
      dateAdded: "2023-05-15",
      targetDate: "2024-06-01",
      priority: "high",
      likes: 42,
      comments: 8,
      shared: 12,
      location: "Santorini, Greece",
      tags: ["beach", "sunset", "romantic"],
      category: "travel",
    },
    {
      id: 2,
      title: "Tokyo, Japan",
      description:
        "Explore the vibrant city with its mix of temples and skyscrapers.",
      media:
        "<https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80>",
      mediaType: "image",
      dateAdded: "2023-06-20",
      targetDate: "2024-09-15",
      priority: "medium",
      likes: 38,
      comments: 5,
      shared: 7,
      location: "Tokyo, Japan",
      tags: ["city", "culture", "technology"],
      category: "travel",
    },
    {
      id: 3,
      title: "Patagonia Adventure",
      description:
        "Hike through the breathtaking landscapes of Patagonia.",
      media:
        "<https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80>",
      mediaType: "image",
      dateAdded: "2023-07-10",
      targetDate: "2024-12-01",
      priority: "high",
      likes: 56,
      comments: 12,
      shared: 15,
      location: "Patagonia, Chile/Argentina",
      tags: ["hiking", "nature", "adventure"],
      category: "travel",
    },
  ],
  movies: [
    {
      id: 4,
      title: "Inception",
      description: "Experience the mind-bending world of dreams within dreams.",
      media:
        "<https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80>",
      mediaType: "image",
      dateAdded: "2023-04-05",
      targetDate: "",
      priority: "high",
      likes: 24,
      comments: 3,
      shared: 5,
      director: "Christopher Nolan",
      year: 2010,
      genre: ["Sci-Fi", "Thriller"],
      category: "movies",
    },
    {
      id: 5,
      title: "Parasite",
      description: "A masterpiece of social commentary and dark comedy.",
      media:
        "<https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80>",
      mediaType: "image",
      dateAdded: "2023-05-12",
      targetDate: "",
      priority: "high",
      likes: 31,
      comments: 7,
      shared: 9,
      director: "Bong Joon-ho",
      year: 2019,
      genre: ["Drama", "Thriller"],
      category: "movies",
    },
  ],
  restaurants: [
    {
      id: 6,
      title: "Le Bernardin",
      description: "Michelin-starred seafood restaurant in New York.",
      media:
        "<https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80>",
      mediaType: "image",
      dateAdded: "2023-03-18",
      targetDate: "2024-02-14",
      priority: "high",
      likes: 18,
      comments: 4,
      shared: 3,
      location: "New York, NY",
      cuisine: "Seafood",
      price: "$$$$",
      category: "restaurants",
    },
  ],
  books: [
    {
      id: 7,
      title: "The Midnight Library",
      description: "A novel about infinite possibilities and life choices.",
      media:
        "<https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80>",
      mediaType: "image",
      dateAdded: "2023-02-20",
      targetDate: "",
      priority: "medium",
      likes: 29,
      comments: 6,
      shared: 8,
      author: "Matt Haig",
      pages: 304,
      genre: "Fiction",
      category: "books",
    },
  ],
  shopping: [],
  sports: [],
  hobbies: [],
};

// --- Helper Functions ---
const getCategory = (categories, key) =>
  categories.find((c) => c.key === key) || categories[0];

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
};

// --- Enhanced Components ---

// --- Premium Badge ---
const PremiumBadge = ({ size = "small" }) => {
  const sizeStyles = {
    small: { fontSize: 12, padding: "2px 8px" },
    medium: { fontSize: 14, padding: "4px 12px" },
    large: { fontSize: 16, padding: "6px 16px" },
  };

  return (
    <div
      style={{
        ...sizeStyles[size],
        background: "linear-gradient(90deg, #FFD700, #FFA500)",
        color: "#000",
        fontWeight: 700,
        borderRadius: 20,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        boxShadow: "0 2px 8px rgba(255, 215, 0, 0.3)",
      }}
    >
      <FaStar /> PREMIUM
    </div>
  );
};

// --- Enhanced Stat Card ---
function StatCard({ icon, value, label, color, trend }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#fff8",
        borderRadius: 18,
        padding: "16px 0",
        textAlign: "center",
        boxShadow: "0 2px 8px #0001",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: color,
        }}
      />
      <div
        style={{
          fontSize: 24,
          color,
          marginBottom: 4,
        }}
      >
        {icon}
      </div>
      <div style={{ fontWeight: 700, fontSize: 22 }}>{value}</div>
      <div style={{ fontSize: 13, color: "#888", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
        {label}
        {trend && (
          <span style={{ color: trend > 0 ? "#4ECDC4" : "#FF6B6B", fontSize: 12 }}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
}

// --- Enhanced Progress Bar ---
function ProgressBar({ value, total, label, color = "#4ECDC4" }) {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div style={{ margin: "18px 0" }}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontWeight: 600 }}>{label}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div
        style={{
          background: "#eee",
          borderRadius: 12,
          height: 18,
          position: "relative",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
            borderRadius: 12,
            width: `${percent}%`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            position: "absolute",
            left: 0,
            top: 0,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      </div>
    </div>
  );
}

// --- Enhanced Category Card ---
function CategoryCard({ category, count, onClick, isSelected }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px #0002" }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "22px 12px 16px 12px",
        textAlign: "center",
        boxShadow: "0 4px 16px #0001",
        border: `3px solid ${category.color}`,
        cursor: "pointer",
        position: "relative",
        transform: isSelected ? "scale(1.05)" : "none",
        zIndex: isSelected ? 2 : 1,
        transition: "transform 0.2s ease",
      }}
      onClick={onClick}
    >
      <div style={{ fontSize: 36, color: category.color, marginBottom: 8 }}>
        {category.icon}
      </div>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{category.name}</div>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{category.description}</div>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 16,
          background: category.color,
          color: "#fff",
          borderRadius: "50%",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 15,
          boxShadow: "0 2px 8px #0001",
        }}
      >
        {count}
      </div>
      {category.featured && (
        <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)" }}>
          <PremiumBadge size="small" />
        </div>
      )}
    </motion.div>
  );
}

// --- Enhanced Wish Card ---
function WishCard({ wish, category, onEdit, onDelete, onComplete, dark, onLike, onShare, onComment }) {
  const [liked, setLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (onLike) onLike(wish.id, !liked);
  };

  return (
    <div
      style={{
        background: wish.media
          ? `url(${wish.media}) center/cover`
          : category.color,
        borderRadius: 24,
        minHeight: 320,
        position: "relative",
        overflow: "hidden",
        border: `4px solid ${category.color}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          background: "linear-gradient(0deg,#000b 60%,#0000 100%)",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "#fff",
          padding: "24px 20px 18px 20px",
          textShadow: "1px 1px 4px #000a",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{wish.title}</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
              Added: {formatDate(wish.dateAdded)}
              {wish.targetDate && (
                <>
                  {" "} | Target: <b>{formatDate(wish.targetDate)}</b>
                </>
              )}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 12,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <FaChevronUp /> : <FaChevronDown />}
          </motion.button>
        </div>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: 12 }}
          >
            <div style={{ fontSize: 15, margin: "8px 0 12px 0" }}>
              {wish.description}
            </div>

            {wish.location && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <FaMapMarkerAlt size={14} />
                <span style={{ fontSize: 14 }}>{wish.location}</span>
              </div>
            )}

            {wish.tags && wish.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {wish.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      padding: "2px 8px",
                      borderRadius: 12,
                      fontSize: 12
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: 18,
                padding: "6px 12px",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              onClick={handleLike}
            >
              {liked ? <FaHeart color="#FF6B6B" /> : <FaRegHeart />}
              {wish.likes + (liked ? 1 : 0)}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: 18,
                padding: "6px 12px",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              onClick={() => onComment && onComment(wish.id)}
            >
              <FaComments />
              {wish.comments}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: 18,
                padding: "6px 12px",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              onClick={() => onShare && onShare(wish)}
            >
              <FaShareAlt />
              {wish.shared}
            </motion.button>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              style={{
                background: "#4ECDC4",
                border: "none",
                borderRadius: 18,
                padding: "6px 12px",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              onClick={() => onComplete(wish)}
            >
              <FaCheckCircle /> Complete
            </motion.button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 18,
              padding: "6px 12px",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onClick={() => onEdit(wish)}
          >
            <FaEdit /> Edit
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 18,
              padding: "6px 12px",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onClick={() => onDelete(wish)}
          >
            <FaTrash /> Delete
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// --- Enhanced Wish Deck ---
function WishDeck({ wishes, category, onEdit, onDelete, onComplete, dark, onLike, onShare, onComment }) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [wishes]);

  if (wishes.length === 0)
    return (
      <div
        style={{
          textAlign: "center",
          color: "#888",
          fontSize: 20,
          padding: 40,
        }}
      >
        <FaCloud style={{ fontSize: 40, marginBottom: 12 }} />
        <div>No wishes in this category yet.</div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: 20,
            background: category.color,
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            borderRadius: 24,
            padding: "12px 24px",
            boxShadow: "0 4px 16px #0001",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
          onClick={() => onEdit(null)}
        >
          <FaPlus /> Add First Wish
        </motion.button>
      </div>
    );

  const wish = wishes[index];

  return (
    <div style={{ minHeight: 340, margin: "24px 0" }}>
      <div style={{ position: "relative", height: 340 }}>
        {/* Card Stack */}
        {wishes.slice(index, index + 3).map((w, i) => (
          <motion.div
            key={w.id}
            drag={i === 0 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragStart={() => setDragging(true)}
            onDragEnd={(e, info) => {
              setDragging(false);
              if (info.offset.x > 120 && index > 0) setIndex(index - 1);
              else if (info.offset.x < -120 && index < wishes.length - 1)
                setIndex(index + 1);
            }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "auto",
              top: i * 12,
              zIndex: 10 - i,
              width: "98%",
              maxWidth: 380,
              boxShadow: "0 8px 32px #0002",
              opacity: 1 - i * 0.18,
              scale: 1 - i * 0.06,
              pointerEvents: i === 0 ? "auto" : "none",
            }}
            initial={{ y: 60, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1 - i * 0.18, scale: 1 - i * 0.06 }}
            exit={{ y: 60, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <WishCard
              wish={w}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
              onComplete={onComplete}
              dark={dark}
              onLike={onLike}
              onShare={onShare}
              onComment={onComment}
            />
            {/* Card Counter */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 18,
                background: "#0006",
                color: "#fff",
                borderRadius: 16,
                fontSize: 13,
                padding: "2px 10px",
                zIndex: 2,
              }}
            >
              {index + 1}/{wishes.length}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          marginTop: 18,
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          disabled={index === 0}
          style={{
            background: "#FF6B6B",
            border: "none",
            borderRadius: "50%",
            width: 44,
            height: 44,
            color: "#fff",
            fontSize: 20,
            cursor: index === 0 ? "not-allowed" : "pointer",
            opacity: index === 0 ? 0.5 : 1,
          }}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          <FaArrowLeft />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          disabled={index === wishes.length - 1}
          style={{
            background: "#FF6B6B",
            border: "none",
            borderRadius: "50%",
            width: 44,
            height: 44,
            color: "#fff",
            fontSize: 20,
            cursor: index === wishes.length - 1 ? "not-allowed" : "pointer",
            opacity: index === wishes.length - 1 ? 0.5 : 1,
          }}
          onClick={() => setIndex((i) => Math.min(wishes.length - 1, i + 1))}
        >
          <FaArrowRight />
        </motion.button>
      </div>
    </div>
  );
}

// --- Enhanced Modal ---
function Modal({ show, onClose, title, children, size = "medium" }) {
  const sizeStyles = {
    small: { maxWidth: 320 },
    medium: { maxWidth: 400 },
    large: { maxWidth: 600 },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={{
            position: "fixed",
            zIndex: 1002,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#0008",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: 32,
              minWidth: 320,
              ...sizeStyles[size],
              width: "90vw",
              boxShadow: "0 8px 32px #0003",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {title}
              <motion.button
                whileTap={{ scale: 0.8, rotate: 90 }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 28,
                  color: "#888",
                  cursor: "pointer",
                }}
                onClick={onClose}
              >
                ×
              </motion.button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Enhanced Add Category Form ---
function AddCategoryForm({ onSubmit, existingKeys }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("FaStar");
  const [color, setColor] = useState("#FF6B6B");
  const [featured, setFeatured] = useState(false);

  const icons = [
    { name: "Star", value: "FaStar", icon: <FaStar /> },
    { name: "Plane", value: "FaPlane", icon: <FaPlane /> },
    { name: "Film", value: "FaFilm", icon: <FaFilm /> },
    { name: "Utensils", value: "FaUtensils", icon: <FaUtensils /> },
    { name: "Book", value: "FaBook", icon: <FaBook /> },
    { name: "Shopping", value: "FaShoppingBag", icon: <FaShoppingBag /> },
    { name: "Sports", value: "FaFutbol", icon: <FaFutbol /> },
    { name: "Hobbies", value: "FaPaintBrush", icon: <FaPaintBrush /> },
    { name: "Calendar", value: "FaCalendarAlt", icon: <FaCalendarAlt /> },
    { name: "Gift", value: "FaGift", icon: <FaGift /> },
    { name: "Trophy", value: "FaTrophy", icon: <FaTrophy /> },
    { name: "Magic", value: "FaMagic", icon: <FaMagic /> },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!name || existingKeys.includes(key)) return;

    onSubmit({
      key,
      name,
      description,
      icon: React.createElement(require("react-icons/fa")[icon]),
      color,
      featured,
      count: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 700 }}>Category Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Adventures"
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
          }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 700 }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe this category..."
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
            minHeight: 60,
          }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 700 }}>Icon</label>
        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
          }}
        >
          {icons.map((ic) => (
            <option key={ic.value} value={ic.value}>
              {ic.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 700 }}>Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            width: 48,
            height: 32,
            border: "none",
            borderRadius: 8,
            marginLeft: 8,
          }}
        />
        <span style={{ marginLeft: 12, fontSize: 14, color: "#666" }}>
          {color}
        </span>
      </div>

      <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          id="featured"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          style={{ marginRight: 8 }}
        />
        <label htmlFor="featured" style={{ fontWeight: 700 }}>
          Featured Category
        </label>
        <span style={{ marginLeft: 8, fontSize: 12, color: "#888" }}>
          (Premium badge)
        </span>
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          background: "#FF6B6B",
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          border: "none",
          borderRadius: 18,
          padding: "12px 0",
          marginTop: 8,
          cursor: "pointer",
        }}
      >
        Create Category
      </button>
    </form>
  );
}

// --- Enhanced Add/Edit Wish Form ---
function AddWishForm({ onSubmit, categories, initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [category, setCategory] = useState(
    initial?.category || categories[0].key
  );
  const [targetDate, setTargetDate] = useState(initial?.targetDate || "");
  const [media, setMedia] = useState(initial?.media || "");
  const [mediaType, setMediaType] = useState(initial?.mediaType || "");
  const [priority, setPriority] = useState(initial?.priority || "medium");
  const [location, setLocation] = useState(initial?.location || "");
  const [tags, setTags] = useState(initial?.tags?.join(", ") || "");
  const [privacy, setPrivacy] = useState(initial?.privacy || "public");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: initial?.id || Date.now(),
      title,
      description,
      category,
      targetDate,
      media,
      mediaType,
      dateAdded:
        initial?.dateAdded || new Date().toISOString().split("T")[0],
      priority,
      location,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      privacy,
      likes: initial?.likes || 0,
      comments: initial?.comments || 0,
      shared: initial?.shared || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 700 }}>Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's your wish?"
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
          }}
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 700 }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your wish..."
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
            minHeight: 60,
          }}
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 700 }}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
          }}
        >
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 700 }}>Target Date (optional)</label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
          }}
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 700 }}>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
          }}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 700 }}>Location (optional)</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where is this wish?"
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
          }}
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 700 }}>Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. beach, vacation, summer"
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
          }}
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 700 }}>Privacy</label>
        <select
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
          }}
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 700 }}>Photo/Video (URL)</label>
        <input
          type="url"
          value={media}
          onChange={(e) => {
            setMedia(e.target.value);
            setMediaType(
              e.target.value.match(/\\.(mp4|webm)$/i) ? "video" : "image"
            );
          }}
          placeholder="Paste image or video URL"
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 14,
            border: "2px solid #eee",
            fontSize: 16,
            marginTop: 4,
          }}
        />
        {media && (
          <div
            style={{
              marginTop: 8,
              borderRadius: 12,
              overflow: "hidden",
              background: "#eee",
            }}
          >
            {mediaType === "video" ? (
              <video src={media} controls style={{ width: "100%" }} />
            ) : (
              <img src={media} alt="preview" style={{ width: "100%" }} />
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          background: "#4ECDC4",
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          border: "none",
          borderRadius: 18,
          padding: "12px 0",
          marginTop: 8,
          cursor: "pointer",
        }}
      >
        {initial ? "Update Wish" : "Add to Wishlist"}
      </button>
    </form>
  );
}

// --- Enhanced Cloud Icon ---
function FaCloud(props) {
  return (
    <svg width={40} height={40} fill="none" viewBox="0 0 40 40" {...props}>
      <ellipse cx="20" cy="28" rx="14" ry="8" fill="#eee" />
      <ellipse cx="13" cy="24" rx="7" ry="5" fill="#eee" />
      <ellipse cx="27" cy="24" rx="7" ry="5" fill="#eee" />
    </svg>
  );
}

// --- Enhanced Main App ---
export default function App() {
  // --- State ---
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("home"); // home | category | completed | profile | settings
  const [categories, setCategories] = useState(defaultCategories);
  const [wishes, setWishes] = useState(sampleWishes);
  const [completed, setCompleted] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("travel");
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiType, setConfettiType] = useState("default");
  const [toast, setToast] = useState({ show: false, message: "", icon: null, type: "default" });
  const [search, setSearch] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddWish, setShowAddWish] = useState(false);
  const [editWish, setEditWish] = useState(null);
  const [theme, setTheme] = useState("default");
  const [notifications, setNotifications] = useState(3);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sortOption, setSortOption] = useState("dateAdded");
  const [filterOption, setFilterOption] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [user, setUser] = useState({
    name: "Alex Johnson",
    avatar: "<https://randomuser.me/api/portraits/men/32.jpg>",
    level: 5,
    xp: 1250,
    nextLevelXp: 1500,
    badges: ["explorer", "bookworm", "foodie"],
  });

  // --- Derived Data ---
  const allWishes = Object.values(wishes).flat();
  const filteredWishes = search
    ? allWishes.filter(
        (w) =>
          w.title.toLowerCase().includes(search.toLowerCase()) ||
          w.description.toLowerCase().includes(search.toLowerCase())
      )
    : allWishes;

  // --- Effects ---
  useEffect(() => {
    if (toast.show) {
      const t = setTimeout(
        () => setToast((t) => ({ ...t, show: false })),
        2200
      );
      return () => clearTimeout(t);
    }
  }, [toast.show]);

  // --- Handlers ---
  const handleToggleDark = () => setDark((d) => !d);

  const handleAddCategory = (cat) => {
    setCategories((cats) => [...cats, cat]);
    setWishes((w) => ({ ...w, [cat.key]: [] }));
    setShowAddCategory(false);
    setToast({
      show: true,
      message: `Category "${cat.name}" created!`,
      icon: <FaStar />,
      type: "success",
    });
  };

  const handleAddWish = (wish) => {
    setWishes((w) => ({
      ...w,
      [wish.category]: [...(w[wish.category] || []), wish],
    }));
    setShowAddWish(false);
    setEditWish(null);
    setToast({
      show: true,
      message: `"${wish.title}" added!`,
      icon: <FaPlus />,
      type: "success",
    });
  };

  const handleEditWish = (wish) => {
    setWishes((w) => ({
      ...w,
      [wish.category]: w[wish.category].map((wi) =>
        wi.id === wish.id ? wish : wi
      ),
    }));
    setShowAddWish(false);
    setEditWish(null);
    setToast({
      show: true,
      message: `"${wish.title}" updated!`,
      icon: <FaEdit />,
      type: "success",
    });
  };

  const handleDeleteWish = (wish) => {
    setWishes((w) => ({
      ...w,
      [wish.category]: w[wish.category].filter((wi) => wi.id !== wish.id),
    }));
    setToast({
      show: true,
      message: `"${wish.title}" deleted!`,
      icon: <FaTrash />,
      type: "warning",
    });
  };

  const handleCompleteWish = (wish) => {
    handleDeleteWish(wish);
    setCompleted((c) => [
      { ...wish, dateCompleted: new Date().toISOString().split("T")[0] },
      ...c,
    ]);
    setShowConfetti(true);
    setConfettiType("success");
    setTimeout(() => setShowConfetti(false), 1800);
    setToast({
      show: true,
      message: `"${wish.title}" completed!`,
      icon: <FaCheckCircle />,
      type: "success",
    });
  };

  const handleLikeWish = (wishId, liked) => {
    setWishes((w) => {
      const updatedWishes = { ...w };
      Object.keys(updatedWishes).forEach(category => {
        updatedWishes[category] = updatedWishes[category].map(wish => {
          if (wish.id === wishId) {
            return {
              ...wish,
              likes: liked ? wish.likes + 1 : Math.max(0, wish.likes - 1)
            };
          }
          return wish;
        });
      });
      return updatedWishes;
    });
  };

  const handleShareWish = (wish) => {
    setWishes((w) => {
      const updatedWishes = { ...w };
      Object.keys(updatedWishes).forEach(category => {
        updatedWishes[category] = updatedWishes[category].map(w => {
          if (w.id === wish.id) {
            return { ...w, shared: w.shared + 1 };
          }
          return w;
        });
      });
      return updatedWishes;
    });
    setToast({
      show: true,
      message: `"${wish.title}" shared!`,
      icon: <FaShareAlt />,
      type: "info",
    });
  };

  const handleCommentWish = (wishId) => {
    setToast({
      show: true,
      message: "Comment feature coming soon!",
      icon: <FaComments />,
      type: "info",
    });
  };

  // --- Render ---
  return (
    <div
      style={{
        fontFamily: "Fredoka One, Comic Neue, sans-serif",
        minHeight: "100vh",
        color: dark ? "#f0f0f0" : "#1A535C",
        background: "none",
        position: "relative",
        overflowX: "hidden",
      }}
      className={dark ? "dark" : ""}
    >
      <AnimatedBackground dark={dark} theme={theme} />
      <Confetti show={showConfetti} type={confettiType} />
      <Toast {...toast} />

      {/* Top Navigation Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: dark ? "#22223b" : "#fff",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 100,
          boxShadow: "0 2px 12px #0002",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              color: dark ? "#FFD166" : "#1A535C",
              cursor: "pointer",
            }}
            onClick={() => setPage("home")}
          >
            <FaHome />
          </motion.button>
          <h2 style={{ margin: 0, fontSize: 22 }}>WishList Adventure</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              color: dark ? "#FFD166" : "#1A535C",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setToast({
              show: true,
              message: "Notifications coming soon!",
              icon: <FaBell />,
              type: "info",
            })}
          >
            <FaBell />
            {notifications > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  background: "#FF6B6B",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {notifications}
              </span>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              color: dark ? "#FFD166" : "#1A535C",
              cursor: "pointer",
            }}
            onClick={() => setPage("profile")}
          >
            <FaUser />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85, rotate: 20 }}
            onClick={handleToggleDark}
            style={{
              background: dark ? "#22223b" : "#fff",
              color: dark ? "#FFD166" : "#1A535C",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              boxShadow: "0 2px 12px #0002",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              cursor: "pointer",
            }}
            aria-label="Toggle dark mode"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </motion.button>
        </div>
      </div>

      {/* Main Container */}
      <div
        style={{
          maxWidth: 540,
          margin: "80px auto 40px auto",
          background: dark ? "#22223be6" : "#fff9",
          borderRadius: 32,
          boxShadow: "0 16px 48px #0002",
          padding: 0,
          position: "relative",
          zIndex: 1,
          minHeight: 600,
        }}
      >
        {/* Header */}
        <motion.header
          style={{
            background: "linear-gradient(90deg,#FF6B6B,#FFD166)",
            borderRadius: "32px 32px 0 0",
            padding: "32px 24px 16px 24px",
            textAlign: "center",
            boxShadow: "0 4px 24px #0001",
          }}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.h1
            style={{
              fontFamily: "Fredoka One, sans-serif",
              fontSize: 36,
              color: "#fff",
              letterSpacing: 1,
              marginBottom: 4,
              textShadow: "2px 2px 0 #0002",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            WishList Adventure
          </motion.h1>
          <div
            style={{
              color: "#fff",
              fontSize: 18,
              marginBottom: 8,
              opacity: 0.85,
            }}
          >
            Your dreams, your journey!
          </div>
        </motion.header>

        {/* Pages */}
        <div style={{ padding: 24 }}>
          {/* Home Page */}
          <AnimatePresence>
            {page === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
              >
                {/* Stats */}
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    margin: "24px 0 12px 0",
                  }}
                >
                  <StatCard
                    icon={<FaStar />}
                    value={allWishes.length}
                    label="Total Wishes"
                    color="#FF6B6B"
                    trend={5}
                  />
                  <StatCard
                    icon={<FaCheckCircle />}
                    value={completed.length}
                    label="Completed"
                    color="#4ECDC4"
                    trend={12}
                  />
                  <StatCard
                    icon={<FaBook />}
                    value={categories.length}
                    label="Categories"
                    color="#FFD166"
                    trend={3}
                  />
                </div>

                {/* Progress Bar */}
                <ProgressBar
                  value={completed.length}
                  total={allWishes.length + completed.length}
                  label="Completion Progress"
                />

                {/* Search and Filters */}
                <div style={{ margin: "18px 0 8px 0", position: "relative" }}>
                  <FaSearch
                    style={{
                      position: "absolute",
                      left: 16,
                      top: 14,
                      color: "#888",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search your wishes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 40px",
                      borderRadius: 32,
                      border: "2px solid #eee",
                      fontSize: 16,
                      background: dark ? "#22223b" : "#fff",
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: 12, margin: "12px 0" }}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={{
                      flex: 1,
                      background: dark ? "#333" : "#f0f0f0",
                      border: "none",
                      borderRadius: 24,
                      padding: "8px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: "pointer",
                      color: dark ? "#ddd" : "#333",
                    }}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <FaFilter /> Filters
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={{
                      flex: 1,
                      background: dark ? "#333" : "#f0f0f0",
                      border: "none",
                      borderRadius: 24,
                      padding: "8px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: "pointer",
                      color: dark ? "#ddd" : "#333",
                    }}
                    onClick={() => setToast({
                      show: true,
                      message: "Sorting options coming soon!",
                      icon: <FaSort />,
                      type: "info",
                    })}
                  >
                    <FaSort /> Sort
                  </motion.button>
                </div>

                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      background: dark ? "#333" : "#f0f0f0",
                      borderRadius: 16,
                      padding: 16,
                      margin: "12px 0",
                    }}
                  >
                    <h4 style={{ margin: "0 0 12px 0" }}>Filter Options</h4>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {["all", "high", "medium", "low"].map((priority) => (
                        <button
                          key={priority}
                          style={{
                            background: filterOption === priority ? "#4ECDC4" : "transparent",
                            border: "1px solid #4ECDC4",
                            borderRadius: 20,
                            padding: "6px 12px",
                            color: filterOption === priority ? "#fff" : "#4ECDC4",
                            cursor: "pointer",
                          }}
                          onClick={() => setFilterOption(priority)}
                        >
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Categories */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 18,
                    margin: "18px 0",
                  }}
                >
                  {categories.map((cat) => (
                    <CategoryCard
                      key={cat.key}
                      category={cat}
                      count={wishes[cat.key]?.length || 0}
                      onClick={() => {
                        setCurrentCategory(cat.key);
                        setPage("category");
                      }}
                      isSelected={currentCategory === cat.key}
                    />
                  ))}
                </div>

                {/* Add Category */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: "100%",
                    marginTop: 18,
                    background:
                      "linear-gradient(90deg,#FF9A8B,#FF6A88,#FF99AC)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 18,
                    border: "none",
                    borderRadius: 24,
                    padding: "16px 0",
                    boxShadow: "0 4px 16px #0001",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => setShowAddCategory(true)}
                >
                  <FaPlus /> Create New Category
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Page */}
          <AnimatePresence>
            {page === "category" && (
              <motion.div
                key="category"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "#FFD166",
                      border: "none",
                      borderRadius: 24,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                    onClick={() => setPage("home")}
                  >
                    <FaHome />
                  </motion.button>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {getCategory(categories, currentCategory).icon}
                    {getCategory(categories, currentCategory).name} Wishes
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "#4ECDC4",
                      border: "none",
                      borderRadius: 24,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      color: "#fff",
                      marginLeft: "auto",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setEditWish(null);
                      setShowAddWish(true);
                    }}
                  >
                    <FaPlus />
                  </motion.button>
                </div>
                <WishDeck
                  wishes={wishes[currentCategory] || []}
                  category={getCategory(categories, currentCategory)}
                  onEdit={(wish) => {
                    setEditWish(wish);
                    setShowAddWish(true);
                  }}
                  onDelete={handleDeleteWish}
                  onComplete={handleCompleteWish}
                  dark={dark}
                  onLike={handleLikeWish}
                  onShare={handleShareWish}
                  onComment={handleCommentWish}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completed Page */}
          <AnimatePresence>
            {page === "completed" && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "#FFD166",
                      border: "none",
                      borderRadius: 24,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                    onClick={() => setPage("home")}
                  >
                    <FaHome />
                  </motion.button>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <FaCheckCircle />
                    Completed Wishes
                  </div>
                </div>
                <div style={{ marginTop: 18 }}>
                  {completed.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        color: "#888",
                        fontSize: 20,
                        padding: 40,
                      }}
                    >
                      No completed wishes yet!
                    </div>
                  ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {completed.map((wish) => (
                        <motion.li
                          key={wish.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          style={{
                            background: "#4ECDC420",
                            borderRadius: 16,
                            marginBottom: 12,
                            padding: "16px 20px",
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                          }}
                        >
                          <span style={{ fontSize: 22, color: "#4ECDC4" }}>
                            {getCategory(categories, wish.category).icon}
                          </span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>
                              {wish.title}
                            </div>
                            <div style={{ fontSize: 14, color: "#888" }}>
                              Completed: {formatDate(wish.dateCompleted)}
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile Page */}
          <AnimatePresence>
            {page === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 24,
                  }}
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "#FFD166",
                      border: "none",
                      borderRadius: 24,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                    onClick={() => setPage("home")}
                  >
                    <FaHome />
                  </motion.button>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <FaUser />
                    Your Profile
                  </div>
                </div>

                <div
                  style={{
                    background: dark ? "#333" : "#f0f0f0",
                    borderRadius: 24,
                    padding: 24,
                    textAlign: "center",
                    marginBottom: 24,
                  }}
                >
                  <img
                    src={user.avatar}
                    alt="Profile"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      border: "4px solid #4ECDC4",
                      marginBottom: 16,
                    }}
                  />
                  <h2 style={{ margin: "0 0 8px 0" }}>{user.name}</h2>
                  <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 700, fontSize: 20 }}>{user.level}</div>
                      <div style={{ fontSize: 14, color: "#888" }}>Level</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 700, fontSize: 20 }}>{user.xp}/{user.nextLevelXp}</div>
                      <div style={{ fontSize: 14, color: "#888" }}>XP</div>
                    </div>
                  </div>

                  <ProgressBar
                    value={user.xp}
                    total={user.nextLevelXp}
                    label="Next Level Progress"
                    color="#FFD166"
                  />

                  <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
                    {user.badges.map((badge, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#4ECDC4",
                          color: "#fff",
                          borderRadius: 20,
                          padding: "4px 12px",
                          fontSize: 14,
                        }}
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: dark ? "#444" : "#fff",
                      border: "1px solid #eee",
                      borderRadius: 16,
                      padding: "16px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                    }}
                    onClick={() => setPage("settings")}
                  >
                    <FaCog size={24} />
                    <span>Settings</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: dark ? "#444" : "#fff",
                      border: "1px solid #eee",
                      borderRadius: 16,
                      padding: "16px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                    }}
                    onClick={() => setToast({
                      show: true,
                      message: "Achievements coming soon!",
                      icon: <FaTrophy />,
                      type: "info",
                    })}
                  >
                    <FaTrophy size={24} />
                    <span>Achievements</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: dark ? "#444" : "#fff",
                      border: "1px solid #eee",
                      borderRadius: 16,
                      padding: "16px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                    }}
                    onClick={() => setToast({
                      show: true,
                      message: "Friends feature coming soon!",
                      icon: <FaUsers />,
                      type: "info",
                    })}
                  >
                    <FaUsers size={24} />
                    <span>Friends</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: dark ? "#444" : "#fff",
                      border: "1px solid #eee",
                      borderRadius: 16,
                      padding: "16px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                    }}
                    onClick={() => setToast({
                      show: true,
                      message: "Export feature coming soon!",
                      icon: <FaDownload />,
                      type: "info",
                    })}
                  >
                    <FaDownload size={24} />
                    <span>Export Data</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Settings Page */}
          <AnimatePresence>
            {page === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 24,
                  }}
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "#FFD166",
                      border: "none",
                      borderRadius: 24,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                    onClick={() => setPage("profile")}
                  >
                    <FaArrowLeft />
                  </motion.button>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <FaCog />
                    Settings
                  </div>
                </div>

                <div
                  style={{
                    background: dark ? "#333" : "#f0f0f0",
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  <h3 style={{ margin: "0 0 16px 0" }}>Appearance</h3>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
                      Theme
                    </label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 14,
                        border: "2px solid #eee",
                        fontSize: 16,
                        background: dark ? "#444" : "#fff",
                        color: dark ? "#fff" : "#000",
                      }}
                    >
                      <option value="default">Default</option>
                      <option value="ocean">Ocean</option>
                      <option value="sunset">Sunset</option>
                      <option value="forest">Forest</option>
                      <option value="cosmic">Cosmic</option>
                      <option value="neon">Neon</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <label style={{ fontWeight: 600 }}>Dark Mode</label>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={dark}
                        onChange={handleToggleDark}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <div
                  style={{
                    background: dark ? "#333" : "#f0f0f0",
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  <h3 style={{ margin: "0 0 16px 0" }}>Notifications</h3>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <label style={{ fontWeight: 600 }}>Push Notifications</label>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <label style={{ fontWeight: 600 }}>Email Updates</label>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <label style={{ fontWeight: 600 }}>Weekly Summary</label>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <div
                  style={{
                    background: dark ? "#333" : "#f0f0f0",
                    borderRadius: 16,
                    padding: 20,
                  }}
                >
                  <h3 style={{ margin: "0 0 16px 0" }}>Account</h3>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: "100%",
                      background: "#FF6B6B",
                      color: "#fff",
                      border: "none",
                      borderRadius: 16,
                      padding: "12px 0",
                      fontWeight: 600,
                      marginBottom: 12,
                      cursor: "pointer",
                    }}
                    onClick={() => setToast({
                      show: true,
                      message: "Premium upgrade coming soon!",
                      icon: <FaRocket />,
                      type: "premium",
                    })}
                  >
                    <FaRocket /> Upgrade to Premium
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: "100%",
                      background: "transparent",
                      color: "#FF6B6B",
                      border: "1px solid #FF6B6B",
                      borderRadius: 16,
                      padding: "12px 0",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => setToast({
                      show: true,
                      message: "Account deletion coming soon!",
                      icon: <FaBan />,
                      type: "warning",
                    })}
                  >
                    <FaBan /> Delete Account
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal
        show={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        title="Create New Category"
        size="large"
      >
        <AddCategoryForm
          onSubmit={handleAddCategory}
          existingKeys={categories.map((c) => c.key)}
        />
      </Modal>

      {/* Add/Edit Wish Modal */}
      <Modal
        show={showAddWish}
        onClose={() => {
          setShowAddWish(false);
          setEditWish(null);
        }}
        title={editWish ? "Edit Wish" : "Add New Wish"}
        size="large"
      >
        <AddWishForm
          onSubmit={editWish ? handleEditWish : handleAddWish}
          categories={categories}
          initial={editWish}
        />
      </Modal>
    </div>
  );
}

// SienaCard.jsx - Fixed and S25 Ultra Optimized
import React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import "./SienaCard.css";

export default function SienaCard({ wish }) {
  // Format date for ribbon
  const getYear = (date) => {
    return new Date(date).getFullYear();
  };
  
  // Get premiere status based on creation date
  const getPremiereStatus = (date) => {
    const now = new Date();
    const created = new Date(date);
    const daysDiff = (now - created) / (1000 * 60 * 60 * 24);
    
    if (daysDiff < 30) return "WORLD PREMIERE";
    if (daysDiff < 90) return "RECENT RELEASE";
    if (daysDiff < 365) return "THIS YEAR";
    return "CLASSIC";
  };
  
  // Format tags for credits
  const getDirector = (tags) => {
    return tags && tags.length > 0 ? tags[0].toUpperCase() : "—";
  };
  
  // Handle explore action
  const handleExplore = (e) => {
    e.stopPropagation();
    console.log('Exploring wish:', wish.content);
    // Add your explore logic here
  };

  return (
    <motion.div
      className="siena-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 1. Full bleed media */}
      {wish.mediaType === "video" ? (
        <video
          autoPlay
          className="siena-media"
          src={wish.media}
          muted
          loop
          playsInline
          poster={wish.thumbnail} // Optional poster for video
        />
      ) : (
        <img 
          className="siena-media" 
          src={wish.media} 
          alt={wish.content}
          loading="lazy" // Performance optimization
        />
      )}

      {/* Dark overlay with fixed gradient clipping */}
      <div className="siena-dark-overlay" />

      {/* 2. Festival ribbon */}
      <div className="siena-ribbon">
        <span className="year">{getYear(wish.created)}</span>
        <small className="subtitle">{getPremiereStatus(wish.created)}</small>
      </div>

      {/* 3. Title section with fixed outline text */}
      <div className="siena-title">
        <small className="category">
          {wish.category.toUpperCase()}
        </small>
        
        <h2>
          {wish.content.toUpperCase()}
        </h2>

        <div className="siena-credits">
          <div>
            <strong>DIRECTOR</strong>
            <span>{getDirector(wish.tags)}</span>
          </div>
          <div>
            <strong>YEAR</strong>
            <span>{getYear(wish.created)}</span>
          </div>
          <div>
            <strong>TYPE</strong>
            <span>{wish.type.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* 4. Side reviews */}
      <div className="siena-reviews">
        {wish.reviews?.slice(0, 3).map((review, index) => (
          <motion.div 
            key={index} 
            className="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stars">
              {[...Array(5)].map((_, starIndex) => (
                <FiStar 
                  key={starIndex} 
                  fill="currentColor"
                  aria-hidden="true" 
                />
              ))}
            </div>
            <small className="source">{review.source.toUpperCase()}</small>
            <blockquote>"{review.quote}"</blockquote>
          </motion.div>
        ))}
      </div>

      {/* 5. Explore button */}
      <motion.button 
        className="siena-explore"
        onClick={handleExplore}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Explore ${wish.content}`}
      >
        EXPLORE →
      </motion.button>
    </motion.div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import "./SienaStyleCard.css";

export default function SienaStyleCard({ wish }) {
  return (
    <motion.div
      className="siena-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      whileHover={{ scale: 1.04 }}
    >
      {/* full-bleed media with dark overlay */}
      {wish.mediaType === "video" ? (
        <video
          autoPlay
          className="siena-media"
          src={wish.media}
          muted
          loop
          playsInline
        />
      ) : (
        <img
          className="siena-media"
          src={wish.media}
          alt={wish.content}
        />
      )}
      <div className="siena-dark-overlay" />

      {/* 1. TITLE & QUOTES up top */}
      <div className="siena-overlay-top">
        <div className="siena-category">
          {wish.category.toUpperCase()}
        </div>
        <h3 className="siena-title">
          {wish.content}
        </h3>
        {wish.reviews && (
          <ul className="siena-quotes">
            {wish.reviews.slice(0,3).map((r,i) => (
              <li key={i}>
                "{r.quote}" <span className="siena-quote-source">— {r.source}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 2. DESCRIPTION at bottom */}
      <div className="siena-overlay-bottom">
        <p className="siena-description">{wish.notes}</p>
        <div className="siena-meta">
          <span className="siena-tag">{wish.type}</span>
          <span className="siena-date">{formatDate(wish.created)}</span>
        </div>
      </div>
    </motion.div>
  );
}

// copy your existing formatDate util
function formatDate(d) {
  const now = new Date(), diff = now - d,
        days = Math.floor(diff/(1000*60*60*24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}
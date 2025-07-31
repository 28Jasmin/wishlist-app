// variants.js - S25 Ultra Optimized Animations
export const pageFade = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit:     { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }
};

export const slideUp = {
  hidden:   { y: 48, opacity: 0 },
  visible:  { y: 0,  opacity: 1, transition: { type: "spring", stiffness: 140, damping: 22 } },
  exit:     { y: 24, opacity: 0, transition: { duration: 0.25 } }
};

export const slideDown = {
  hidden:   { y: -48, opacity: 0 },
  visible:  { y: 0,  opacity: 1, transition: { type: "spring", stiffness: 140, damping: 22 } },
  exit:     { y: -24, opacity: 0, transition: { duration: 0.25 } }
};

export const staggerContainer = {
  hidden:   { opacity: 1 },
  visible:  { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export const itemFade = {
  hidden:   { y: 24, opacity: 0 },
  visible:  { y: 0,  opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export const scaleIn = {
  hidden:   { scale: 0.85, opacity: 0 },
  visible:  { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 220, damping: 18 } },
  exit:     { scale: 0.85, opacity: 0, transition: { duration: 0.2 } }
};

export const fabEntry = {
  hidden:   { scale: 0, opacity: 0 },
  visible:  { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 280, damping: 22, delay: 0.9 } }
};
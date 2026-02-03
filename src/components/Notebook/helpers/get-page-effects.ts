
import type { CSSProperties } from "react";

// Easing function that mimics paper physics:
// - Fast start (page lifts quickly)
// - Slow middle (air resistance)
// - Gentle settle (page lands softly)
const PAGE_FLIP_EASING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

// Calculate transform based on visibility and hover state
// When page is hovered, it "flips up" like turning a real notebook page
// Uses rotateX for the page-turn effect combined with translateY for final position
const getPageTransform = (isVisible: boolean, isHovered: boolean, notebookHeight: number) => {
  const slideOutDistance = notebookHeight * 0.2;

  if (!isVisible) {
    // Hidden state: page is flat inside the notebook
    return "rotateX(0deg) translateY(0px) translateZ(0px)";
  }
  if (isHovered) {
    // Active/hovered state: page has flipped up to reveal content
    // Final position matches original: translateY + translateX + rotate(10deg)
    return `translateY(-${slideOutDistance}px) translateX(5px) rotate(5.5deg)`;
  }
  // Visible but not hovered: page is resting in the notebook
  return "rotateX(0deg) translateY(0px) translateZ(0px)";
};

const getPageTransition = (isHovered: boolean, delay: number) => {
  if (isHovered) {
    // Flipping up: slightly faster, with bounce
    return `transform 450ms ${PAGE_FLIP_EASING} ${delay}ms, opacity 300ms ease-out ${delay}ms, box-shadow 400ms ease-out ${delay}ms`;
  }
  // Settling back: slower, more gentle
  return `transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, opacity 300ms ease-in ${delay}ms, box-shadow 350ms ease-in ${delay}ms`;
};

const getPageBoxShadow = (isVisible: boolean, isHovered: boolean) => {
  if (!isVisible) {
    return "0 1px 2px rgba(0,0,0,0.05)";
  }
  if (isHovered) {
    return "0 15px 35px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1)";
  }
};

type GetPageEffectsParams = {
  isPadded: boolean,
  notebookHeight: number,
  delay: number,
  isVisible: boolean,
  isHovered: boolean,
}

export const getPageEffects = ({ isPadded, notebookHeight, delay, isVisible, isHovered }: GetPageEffectsParams): CSSProperties => {
  return {
    transform: getPageTransform(isVisible, isHovered, notebookHeight),
    transition: getPageTransition(isHovered, delay),
    boxShadow: isPadded ? getPageBoxShadow(isVisible, isHovered) : undefined,
  };
}

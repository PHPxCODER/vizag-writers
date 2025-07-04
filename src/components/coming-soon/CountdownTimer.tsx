"use client";

import React from "react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({
  days,
  hours,
  minutes,
  seconds,
}: CountdownTimerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12 max-w-lg md:max-w-2xl mx-auto px-4"
    >
      {[
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Minutes", value: minutes },
        { label: "Seconds", value: seconds },
      ].map((item) => (
        <motion.div
          key={item.label}
          className="
            relative
            flex flex-col items-center justify-center
            rounded-xl
            p-3 md:p-4
            shadow-lg
            border border-border/50
            backdrop-blur-sm
            bg-card/30
            transition-all duration-200 ease-out
          "
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Numbers: Ensure strong visibility and solid color */}
          <div
            className="
              text-xl md:text-2xl lg:text-3xl font-bold mb-1 font-inter
              text-foreground         /* Use foreground color for good contrast */
              // Removed text-shadow if it's contributing to an unwanted border, or adjust if it's actually helpful
              // The drop-shadow was meant to prevent it from blending, but might be perceived as a border.
              // If still visible, try `text-black` and `dark:text-white` directly as a test.
            "
            // To ensure no accidental gradient clipping:
            // Explicitly reset any text-related background/clipping properties
            style={{
              WebkitTextFillColor: 'unset', // Ensures text fills with its color, not a gradient
              WebkitBackgroundClip: 'unset', // Ensures background doesn't clip text
              backgroundImage: 'unset',      // Clear any inherited background images
            }}
          >
            <NumberFlow
              value={item.value}
              format={{ minimumIntegerDigits: 2 }}
              className="tabular-nums"
              transformTiming={{
                duration: 800,
                easing: "ease-out",
              }}
            />
          </div>
          {/* Labels: Ensure good visibility */}
          <div
            className="
              text-xs md:text-sm uppercase tracking-wider font-inter
              text-muted-foreground/80
              dark:text-muted-foreground/90
            "
          >
            {item.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
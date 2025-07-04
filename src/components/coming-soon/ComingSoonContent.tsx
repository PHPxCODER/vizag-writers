"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, ExternalLink } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import { NotifyForm } from "./NotifyForm";
import { useCountdown } from "@/hooks/use-countdown";
import { ModeToggle } from "@/components/theme-toggle";

interface ComingSoonContentProps {
  launchDate: Date;
  title: string;
  subtitle: string;
}

export function ComingSoonContent({
  launchDate,
  title,
  subtitle,
}: ComingSoonContentProps) {
  const timeLeft = useCountdown(launchDate);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-2 sm:px-4 py-8 sm:py-12">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-20"> {/* Higher z-index to ensure it's on top */}
        <ModeToggle /> 
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full"
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-dancing-script font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight px-4"
          style={{
            backgroundSize: "200% 200%",
            animation: "gradient-shift 3s ease-in-out infinite",
            lineHeight: "1.2",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-xl mx-auto font-inter px-4 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <CountdownTimer
          days={timeLeft.days}
          hours={timeLeft.hours}
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds}
        />

        <NotifyForm />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 text-muted-foreground font-inter px-4"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-xs sm:text-sm text-center">
              Launching{" "}
              {launchDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at 11:00 AM IST
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Powered by footer - positioned at bottom */}
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center text-xs text-muted-foreground/70 font-inter"
        >
          Crafted with{" "}
          <span
            className="inline-block text-red-500"
            style={{
              animation: "smoothPulse 1.5s ease-in-out infinite",
            }}
          >
            ❤
          </span>
          {" "}by{" "}
          <a
            href="https://rdpdatacenter.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/80 font-medium hover:text-primary transition-colors duration-200 inline-flex items-center gap-1"
          >
            RDP Datacenter
            <ExternalLink className="h-3 w-3" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}